README for generate-timeseries-image.py
=======================================

How to use `generate-timeseries-image.py`:

```
usage: python generate-timeseries-image.py [-h] [-v {2t,sst}] [-f {png,pdf}] [-a]

Create image of daily time series for Climate Pulse

examples:
python generate-timeseries-image.py -v sst
python generate-timeseries-image.py -v sst -f pdf
python generate-timeseries-image.py -v sst -f pdf -a

options:
  -h, --help            show this help message and exit
  -v {2t,sst}, --varname {2t,sst}
                        Variable name (default: 2t)
  -f {png,pdf}, --format {png,pdf}
                        Image format (default: png)
  -a, --anomalies       Plot anomalies (default: False)
```
