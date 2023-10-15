"""empty message

Revision ID: 71f9195f47eb
Revises: 56cbfe15dd39
Create Date: 2023-10-15 09:57:54.165941

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '71f9195f47eb'
down_revision = '56cbfe15dd39'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user_progress',
    sa.Column('user_id', sa.BigInteger(), nullable=False),
    sa.Column('progress_id', sa.BigInteger(), nullable=False),
    sa.Column('progress', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['progress_id'], ['progress.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'progress_id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_progress')
    # ### end Alembic commands ###