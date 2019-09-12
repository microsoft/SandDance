# SandDance in Power BI

## Background
There was a previous release of SandDance to AppSource (the marketplace behind Power BI) which was named "SandDance".
This GitHub repo contains the code for the "new" SandDance, and has been released to AppSource as ["SandDance 2019"](https://appsource.microsoft.com/en-us/product/power-bi-visuals/WA200000430).

## FAQ
* **Q: Will my reports using the *SandDance* custom visual automatically upgrade to *SandDance 2019*?**
<br/>A: No. They are separate custom visuals.

* **Q: Is the old *SandDance* still available?**
<br/>A: It is not visible in the marketplace. Any existing reports containing the *SandDance* custom visual will continue to work as usual.

* **Q: Does *SandDance 2019* have all of the functionality from its predecessor?**
<br/>A: *SandDance 2019* is a complete reimplementation of SandDance built on a different technology stack. As such, there are certain features that haven’t been reimplemented and other features that are. For example, it has a better 3D mode, allow more smooth rotation and pan/zoom.  The model for selection is different, since clicking in the viewing area pans/zooms/rotates the view.  Please [create an issue](https://github.com/microsoft/SandDance/issues/new) to let us know what missing features you need. We'll do our best to prioritize that when we’re adding functionality.

* **Q: How many data points are supported in *SandDance 2019*?**
<br/>A: Right now, there is a limit of 30K data points that are sent to any custom visual. We’re exploring ways to increase this limit.

## Usage
Note that PowerBI aggregates data when sending it down to be displayed to a custom visual. Since SandDance works best when working on non-aggregated data, make sure to send down at least one column with unique IDs to keep it from performing aggregation.

Watch this space for tutorials to show how best to use *SandDance 2019* in PowerBI.
