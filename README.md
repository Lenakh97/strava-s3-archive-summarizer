# strava-s3-archive-summarizer

This repo uses Strava data from a AWS s3 bucket, and summarizes the data.

The Strava data can be fetched by typing the following code in the terminal

```
aws s3 sync
s3://strava-archive ./archive
```