import plotly.graph_objects as go
import numpy as np
import pandas as pd
from datetime import datetime, timedelta


C3S_RED = "#941333"
DEFAULT_COLOR = "#E6E6E6"

DEFAULT_LINEWIDTH = 1
LATEST_LINEWIDTH = 2

VARIABLES = {
    "sst": "sea surface temperature",
    "temp": "surface air temperature",
}

DOMAINS = {
    "sst": "60°S - 60°N",
    "temp": "Global",
}


