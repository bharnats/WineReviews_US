import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
app = Flask(__name__)

dbfile = os.path.join('raw_data','full_data', 'wine.sqlite')
engine = create_engine(f"sqlite:///{dbfile}")

Base = automap_base()
Base.prepare(engine, reflect=True)

session = Session(engine)


@app.route("/")
def index():
    """Return the homepage."""
    return render_template('index.html')

@app.route("/bar")
def bar():
    """Return the homepage."""
    return render_template('bar.html')

@app.route('/states')
def states():
    """Return a list of sample names."""

    # Use Pandas to perform the sql query
    state_avg=pd.read_sql('prpt',engine)
    states=list(state_avg['State'].unique())

    # Return a list of the column names (sample names)
    return jsonify(list(states))

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

if __name__ == "__main__":
    app.run(debug=True)