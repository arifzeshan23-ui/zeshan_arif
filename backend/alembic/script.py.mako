from alembic.script import ScriptDirectory
from alembic.config import Config

script = ScriptDirectory.from_config(Config("alembic.ini"))


def process_revision_directives(context, revision, directives):
    pass
