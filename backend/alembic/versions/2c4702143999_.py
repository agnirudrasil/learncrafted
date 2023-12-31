"""empty message

Revision ID: 2c4702143999
Revises: 71f9195f47eb
Create Date: 2023-10-15 10:28:40.661839

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2c4702143999'
down_revision = '71f9195f47eb'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user_progress', sa.Column('completed', sa.Boolean(), server_default='false', nullable=False))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user_progress', 'completed')
    # ### end Alembic commands ###