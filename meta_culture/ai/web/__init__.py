from flask import Flask
from werkzeug.utils import find_modules, import_string
from flask_cors import CORS


def creat_app():
    app = Flask(__name__)
    CORS(app)
    # app.config.from_json("config.json")

    # Custom error interception
    from web.error_controller import error_controller
    app.register_blueprint(error_controller)

    # register route
    def register_blueprints(root):
        for name in find_modules(root, recursive=True):
            mod = import_string(name)
            if hasattr(mod, 'bp'):
                urls = name.split('.')
                length = len(urls)
                prefix = ''
                for i in range(length):
                    if urls[i].find('web') < 0 and urls[i].find('controller') < 0:
                        prefix = prefix + '/' + urls[i]
                app.register_blueprint(
                    mod.bp, url_prefix=prefix)

    register_blueprints('web.controller')

    return app
