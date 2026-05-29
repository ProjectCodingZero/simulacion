from pydantic import Field
from typing import Annotated
# Definimos un alias de tipo que Pylance entenderá como "un float entre 0 y 1"
Num0_1 = Annotated[float, Field(ge=0, le=1)]