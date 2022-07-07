# SandDance

Visually explore, understand, and present your data.

![sanddance-animation](https://user-images.githubusercontent.com/11507384/54236654-52d42800-44d1-11e9-859e-6c5d297a46d2.gif)

By using easy-to-understand views, SandDance helps you find insights about your data, which in turn help you tell stories supported by data, build cases based on evidence, test hypotheses, dig deeper into surface explanations, support decisions for purchases, or relate data into a wider, real world context.

SandDance uses unit visualizations, which apply a one-to-one mapping between rows in your database and marks on the screen.
Smooth animated transitions between views help you to maintain context as you interact with your data.

> This new version of SandDance has been rebuilt from scratch with the goal of being modular, extensible, and embeddable into your custom applications. We are now on GitHub so that we are open and driven by the community through contributions, feature requests, and discussion.

SandDance was created by the [Microsoft Research VIDA Group](https://aka.ms/vida) which explores novel technologies for visualization and immersive data analytics.

## Where can I use SandDance?
* [Try it now on the web](https://microsoft.github.io/SandDance/app/)
* Microsoft apps:
  * [Power BI](https://appsource.microsoft.com/en-us/product/power-bi-visuals/WA200000430) - [*see additional info*](https://github.com/microsoft/SandDance/blob/master/powerbi.md)
  * [Azure Data Studio](https://docs.microsoft.com/en-us/sql/azure-data-studio/sanddance-extension?view=sql-server-2017)
  * [VSCode extension](https://marketplace.visualstudio.com/items?itemName=msrvida.vscode-sanddance)
* 3rd Party apps:
  * [Observable](https://observablehq.com/collection/@danmarshall/sanddance)
  * [Jupyter widget](https://github.com/microsoft/SandDance/tree/master/python/jupyter-widget#sanddance-jupyter-widget)
  * [HASH Core IDE](https://core.hash.ai/) - [*see 'Step Explorer' documentation*](https://docs.hash.ai/core/creating-simulations/views#step-explorer)
* In your own JavaScript apps - see below

## Component architecture

SandDance is an offering of several JavaScript components:

* [sanddance](packages/sanddance/README.md) - the core SandDance visualization canvas.
* [sanddance-specs](packages/sanddance-specs/README.md) - [Vega specifications](https://vega.github.io/vega/docs/specification/) for unit visualizations.
* [sanddance-react](packages/sanddance-react/README.md) - the core SandDance visualization canvas for use in React based applications.
* [sanddance-explorer](packages/sanddance-explorer/README.md) - the core SandDance visualization canvas with UI to enable data exploration, for use in React based applications.

## Publications

* 2018 - [Atom: A Grammar for Unit Visualizations](https://www.microsoft.com/en-us/research/uploads/prod/2019/01/atom.pdf)
  * Deokgun Park, Steven Drucker, Roland Fernandez, Niklas Elmqvist
  * IEEE Transactions on Visualization and Computer Graphics | December 2018, Vol 24(12): pp. 3032-3043
* 2015 - [A Unifying Framework for Animated and Interactive Unit Visualizations](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/sanddance.pdf)
  * Steven Drucker, Roland Fernandez 
  * MSR-TR-2015-65 | August 2015

## Articles & videos

* [SandDance project @ Microsoft Research](https://www.microsoft.com/en-us/research/project/sanddance/)
* [Microsoft Research webinar / Data Visualization: Bridging the Gap Between Users and Information](https://note.microsoft.com/MSR-Webinar-Data-Visualization-Registration-On-Demand.html).
* [SQL Server Blog / The August release of Azure Data Studio is now available](https://cloudblogs.microsoft.com/sqlserver/2019/08/15/the-august-release-of-azure-data-studio-is-now-available/)
* [Open Source Blog / What’s new in SandDance 3](https://cloudblogs.microsoft.com/opensource/2020/06/23/whats-new-sanddance-3-microsoft-research/)
* [Channel 9 - Data Exposed / Introducing SandDance: Data Visualization in Azure Data Studio](https://channel9.msdn.com/Shows/Data-Exposed/Introducing-SandDance-Data-Visualization-in-Azure-Data-Studio)
* [Channel 9 - Data Exposed / What is SandDance?](https://channel9.msdn.com/Shows/Data-Exposed/What-is-SandDance)
* [Hacker News / Microsoft open sources SandDance, a visual data exploration tool](https://news.ycombinator.com/item?id=21224685)
* [analyticsindiamag.com / Visualizations With SandDance Using Visual Studio Code](https://analyticsindiamag.com/visualizations-with-sanddance-using-visual-studio-code/)
* [codeburst.io / Exploring Titanic Dataset using Microsoft’s Sandance](https://codeburst.io/exploring-titanic-dataset-using-microsofts-sandance-175eb04b3ac2)
* [mathkuro.com / VS Codeのイケメンすぎる分析＆可視化ツールSand Danceの使い方](https://www.mathkuro.com/vs-code/sand-dance/)
* [mathkuro.com / 【SandDanceグラフサンプル】用途に合わせて選択しましょう◎](https://www.mathkuro.com/vs-code/sanddance-charts/)
* [medium.com - @sefaoguzsaglam / how to start data visualizing with Microsoft’s SandDance (for beginners)](https://medium.com/@sefaoguzsaglam/how-to-start-data-visualizing-with-microsofts-sanddance-for-beginners-abe5c0552750)
* [mssqltips.com / SandDance for Azure Data Studio](https://www.mssqltips.com/sqlservertip/6045/sanddance-for-azure-data-studio/)
* [sqlshack.com / Exploring the SandDance Visualizations extension in Azure Data Studio](https://www.sqlshack.com/exploring-the-sanddance-visualizations-extension-in-azure-data-studio/)
* [torbjornzetterlund.com / I got to do some SandDance visualization](https://torbjornzetterlund.com/i-got-to-do-some-sanddance-vizualisation/)
* [YouTube - Anjani Prasad Atluri / SandDance: A tutorial](https://www.youtube.com/watch?v=sI4WIQEz07w)
* [YouTube - BI Tracks / SandDance Visualizations Tutorial - Azure Data Studio](https://www.youtube.com/watch?v=iUhvYMggzAQ)

## Changelog

* June 2020 - Major version bump to v3: Now using Deck.gl@8.
* December 2019 - Major version bump to v2: Now using Vega@5.
* August 2019 - Initial release to AppSource (Power BI marketplace).
* April 2019 - Initial release to GitHub.

## Known issues

* Animations require a WebGL2 enabled browser.

## Roadmap

* ~~PowerBI custom visual based on this new architecture.~~ done!
* ~~Additional views, such as stacks.~~ done!
* Code examples and tutorials.
* ~~Faceting for all chart types.~~ done!
* Better date handling.

## Dependencies

SandDance is created with open source libraries, using [Vega](https://vega.github.io) for chart layout and [Deck.gl](https://deck.gl) for WebGL rendering.

## Development

See [dev.md](dev.md)

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
