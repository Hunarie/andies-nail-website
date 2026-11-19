"""Preview the site locally:  python tools/serve.py  ->  http://localhost:4173

Serves public/ with the same response headers Vercel will send (read from
vercel.json), so the Content-Security-Policy is exercised before you deploy.
The contact form needs Vercel to send mail; here it reports an error instead.
"""
import json
import re
import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
RULES = json.loads((ROOT / "vercel.json").read_text(encoding="utf-8"))["headers"]


class Handler(SimpleHTTPRequestHandler):
    extensions_map = {
        **SimpleHTTPRequestHandler.extensions_map,
        ".css": "text/css",
        ".js": "text/javascript",
        ".webp": "image/webp",
        ".woff2": "font/woff2",
    }

    def end_headers(self):
        path = self.path.split("?")[0]
        for rule in RULES:
            if re.fullmatch(rule["source"], path):
                for header in rule["headers"]:
                    self.send_header(header["key"], header["value"])
        super().end_headers()

    def do_GET(self):
        # Vercel's analytics scripts only exist on Vercel. Answer with an empty
        # script here so the browser console stays clean while previewing.
        if self.path.startswith("/_vercel/"):
            self.send_response(200)
            self.send_header("Content-Type", "text/javascript")
            self.send_header("Content-Length", "0")
            self.end_headers()
            return
        super().do_GET()

    def send_error(self, code, message=None, explain=None):
        if code != 404:
            return super().send_error(code, message, explain)
        body = (PUBLIC / "404.html").read_bytes()
        self.send_response(404)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        if self.command != "HEAD":
            self.wfile.write(body)


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 4173
    print(f"Serving {PUBLIC} at http://localhost:{port}  (Ctrl+C to stop)")
    ThreadingHTTPServer(("127.0.0.1", port), partial(Handler, directory=str(PUBLIC))).serve_forever()
