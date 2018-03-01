from flask import Flask, jsonify, render_template
import os
import numpy as np
import pandas as pd


# read the csv files into pandas as dataframes
filepath = os.path.join("raw_data/coordinates.csv")
coord_df = pd.read_csv(filepath,encoding="iso-8859-1", low_memory=False)
# replace the empty strings with NaN values in latitude and longitude columns
coord_df['longitude'].replace('', np.nan, inplace=True)
coord_df['latitude'].replace('', np.nan, inplace=True)

# list of regions
regions = list(coord_df['region_1'].unique())

# list of grape varieties
variety = list(coord_df['variety'].unique())

# group the coord_df based on variety and region
grouped = coord_df.groupby(['variety','region_1'])
grouped = grouped['region_1'].count()

# create a dataframe from the grouped object
variety_df = pd.DataFrame({'count' : coord_df.groupby( [ "variety", "region_1","latitude","longitude"] ).size()}).reset_index()

# creating the geojson data for the landing page
geojson=[]
for index, row in variety_df.iterrows():
    feature = {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [row['longitude'], row['latitude']] 
        },
        "properties": {
            "name":row['region_1'],
            "grape":row['variety'],
            "count":row['count']
        }
    }
    geojson.append(feature)

geoJson_data = {
  "type": "FeatureCollection",
  "features": geojson
}


app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/Data")
def Map():
    return jsonify(geoJson_data)

@app.route("/regions")
def names():
    return jsonify(regions)

@app.route("/varieties")
def types():
    return jsonify(variety)

@app.route('/varieties/<grape>')
def samples(grape):
    col=grape
    sliced_df = variety_df.loc[variety_df['variety'] == col]

    # create geojson data set for the above sliced dataframe
    my_json=[]
    for index,row in sliced_df.iterrows():
        feature = {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [row['latitude'],row['longitude']] 
        },
        "properties": {
        "name":row['region_1'],
        "grape":row['variety'],
        "count":row['count']
        }
        }
        my_json.append(feature)

    my_geoJson_data = {
    "type": "FeatureCollection",
    "features": my_json
    }
    return jsonify(my_geoJson_data)


if __name__ == "__main__":
    app.run(debug=True)
    




