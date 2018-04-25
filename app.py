# import dependancies
import os
import numpy as np
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine,func

from flask import Flask, jsonify, render_template
app = Flask(__name__)

#################################################
# Database Setup
#################################################

@app.route("/")
def index():
    return render_template('index.html')


@app.route("/regions")
def names():
      # query the SQLite table and store in a df
    stmt = session.query(wine_reviews).statement
    df = pd.read_sql_query(stmt, session.bind)
    # list of regions
    regions = list(df['region_1'].unique())
    return jsonify(regions)

@app.route("/varieties")
def types():
      # query the SQLite table and store in a df
    stmt = session.query(wine_reviews).statement
    df = pd.read_sql_query(stmt, session.bind)
    # list of grape varieties
    variety = list(cluster_df['variety'].unique())
    return jsonify(variety)

# data for marker clusters map
@app.route("/cluster_data")
def cluster():

    # query the SQLite table and store in a df
    stmt = session.query(wine_reviews).statement
    df = pd.read_sql_query(stmt, session.bind)

# group the df by region_1,latitude and logitude and aggregate the grape variety
    cluster_df = df.groupby(["region_1","latitude","longitude"]).agg({"variety":pd.Series.nunique}).reset_index()

# create json dictionary from the cluster_df dataframe to render the clusters map
    json_data =[]
    for index,row in cluster_df.iterrows():
   
        location = {
        "type": "Point",
        "coordinates": [row['latitude'],row['longitude']] ,
        "variety_count":row['variety'],
        "region":row['region_1']
        }
        json_data.append(location)

    return jsonify(json_data)

# Navigation between pages
@app.route("/bar.html")
def bar():
    """Return the homepage."""
    return render_template('bar.html')

@app.route("/index.html")
def home():
    return render_template('index.html')

# Routes for charts
@app.route('/states')
def states():
    """Return a list of states names."""

    # Use Pandas to perform the sql query
    stmt = session.query(wine_reviews).statement
    df = pd.read_sql_query(stmt, session.bind)
    states=list(df['province'].unique())

    # Return a list of the column names (state names)
    return jsonify(states)


@app.route("/stateData/<state>")
def stateData(state):
    state_avg=pd.read_sql('prpt',engine)
    stateData=state_avg[(state_avg['State']==state)]
    stateData=stateData.sort_values(by='Avg_Points', ascending=1)
    data= [{
        "Avg_Points": stateData['Avg_Points'].values.tolist(),
        "Avg_Price": stateData['Avg_Price'].values.tolist(),
        "State": stateData['State'].values.tolist(),
        "Variety":stateData['Variety'].values.tolist(),
        "Title_Count":stateData['Title_Count'].values.tolist()
    }]
    return jsonify(data)

@app.route("/data.html")
def data():
    """Return the data for the table"""
    return render_template('data.html')


@app.route("/tabledata")
def tabledata():
    # Query for the number of wine reviews by state
    stmt = session.query(wine_reviews).statement
    df = pd.read_sql_query(stmt, session.bind)
    del df['id']
    del df['latitude']
    del df['longitude']
    
    df.dropna(how="any", inplace=True)
    data = df.to_dict(orient='records')

    # Returns json list of all reviews
    return jsonify(data)


if __name__ == "__main__":
    dbfile = os.path.join('raw_data/wine_reviews.sqlite')
    engine = create_engine(f"sqlite:///{dbfile}")
    # reflect an existing database into a new model
    Base = automap_base()
    # reflect the tables
    Base.prepare(engine, reflect=True)
    # Save references to each table
    wine_reviews = Base.classes.reviews 
    # Create our session (link) from Python to the Database
    session = Session(engine)
    app.run(debug=True)
    




