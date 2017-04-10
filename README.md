# Healthy Corner Store Services by Census Tract in Philadelphia

Measuring and quantifying access to healthy food is a hot topic right now in GIS, particularly in Philadelphia. Using the Healthy Corner Store Locations shapefile found on OpenDataPhilly, I created one map of the City of Philadelphia showing census tracts that are over-served and underserved by Healthy Corner Stores, based on the population of each tract.

Use the interactive version of this resulting map:

https://aronxoxo.github.io/Philly-Healthy-Corner-Stores/

![Result Map](https://raw.githubusercontent.com/aronxoxo/Philly-Healthy-Corner-Stores/master/image/result_map.jpg "Result Map")

## Methodology
The resulting map, detailed workflow, and the discussions are [here](https://drive.google.com/file/d/0B04zd0Nhy2ymVEJXUVdBa2gzSzA/view).

## This App
This is an interactive map showing census tracts which are over-served and under-served by Healthy Corner Stores ranked by the "service score". This app has the following features:
* Hovering on census tracts, each census tract's population density (2010 Census) will display.
* Clicking on healthy corner stores, a popup showing its name and a link powered by Google Maps to direct you from your current location to this store will display.

## Data Sources:
* [Philadelphia Census Tract](https://www.opendataphilly.org/dataset/census-tracts)
* [Philadelphia Healthy Corner Stores](https://www.opendataphilly.org/dataset/healthy-corner-store-locations)
* Census 2010
