/**
 * @file mofron-comp-jspreadsheet/index.js
 * @brief jspreadsheet component for mofron
 * @license MIT
 */
//const Highcharts = require('highcharts'); 

module.exports = class extends mofron.class.Component {
    /**
     * initialize component
     * 
     * @param (mixed) string: label text
     *                key-value: component config
     * @type private
     */
    constructor (p1) {
        try {
            super();
            this.modname("Highcharts");
            this.shortForm("type");
	    
            this.confmng().add("core",    { type: "object" });
            this.confmng().add("type",    { type:"string", init:"line", select:["line", "column", "area", "pie"] });
	    this.confmng().add("libType", { type:"string", init:"chart", select:["chart","stock","maps","gantt"]  });
            this.confmng().add("legend",{
                type: "object",
                init: {layout: 'vertical', align: 'right', verticalAlign: 'middle'}
            });
            this.confmng().add("option", { type: "object", init: {} });
            this.confmng().add("title",  { type: "string" });
            this.confmng().add("series", { type: "object", list: true });
            this.confmng().add("yAxis", { type: "object" });
            this.confmng().add("xAxis", { type: "object" });

            /* init config */
	    if (0 < arguments.length) {
                this.config(p1);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     * 
     * @type private
     */
    initDomConts () {
        try {
            super.initDomConts();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    type (prm) {
        try {
            return this.confmng("type", prm);
	} catch (e) {
	    console.error(e.stack);
            throw e;
	}
    }

    libType (prm) {
        try {
            return this.confmng("libType", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    option (prm) {
        try {
            return this.confmng("option",prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    title (prm) {
        try {
            return this.confmng("title", prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    legend (prm) {
        try {
            if (undefined !== prm) {
                let leg = this.legend();
                for (let pidx in prm) {
                    leg[pidx] = prm[pidx];
                }
                this.confmng("legend", leg);
                return;
            }
            return this.confmng("legend", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    series (prm) {
        try {
	    if (null === prm) {
                this.confmng().delete("series");
		return;
	    }
            return this.confmng("series", prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    yAxis (prm) {
        try {
            return this.confmng("yAxis", prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

    xAxis (prm) {
        try {
            return this.confmng("xAxis", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    afterRender () {
        try {
            super.afterRender();
            this.draw();
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    draw (prm) {
        try {
	    let x_axis = { categories: [] };
            if (("pie" !== this.type()) && (0 !== this.series().length)) {
	        if ("string" === typeof this.series()[0].data[0][0]) {
                    /* sort x-axis */
                    let series = JSON.parse(JSON.stringify(this.series()));
                    //for (let sidx in series) {
                        for (let didx in series[0].data) {
                            x_axis.categories.push(series[0].data[didx][0]);
                            series[0].data[didx].shift();
                        }
                    //}
                }
            }
            
            
	    let opt = {
                chart: {
                    type: this.type()
		},
                title: {
                    text: this.title()
                },
		yAxis: this.yAxis(),
		legend: this.legend(),
                series: this.series(),
                exporting: {
                    chartOptions: { // specific options for the exported image
                        plotOptions: {
                            series: {
                                //dataLabels: {
                                //    enabled: true
                                //}
                            }
                        }
                    },
                    fallbackToExportServer: false
                },

	    };
            
	    let add_option = this.option();
	    if (null !== add_option) {
                for (let oidx in add_option) {
                    opt[oidx] = add_option[oidx];
		}
	    }

            //if (null !== this.title()) {
            //    opt.title.text = this.title();
	    //}
            
            if (null !== this.height()) {
                opt.height = this.height();
	    }

            if (0 !== x_axis.categories.length) {
                opt.xAxis = x_axis;
	    } else if (null !== this.xAxis()) {
                opt.xAxis = this.xAxis();
            }
            
	    // "basic","stock","maps","gantt"
            let core = null;
            if ("chart" === this.libType()) {
                core = Highcharts.chart(this.childDom().getRawDom(),opt)
	    } else if ("stock" === this.libType()) {
                core = Highcharts.stockChart(this.childDom().getRawDom(),opt)
            } else if ("maps" === this.libType()) {
                core = Highcharts.mapChart(this.childDom().getRawDom(),opt)
            } else if ("gantt" === this.libType()) {
                core = Highcharts.ganttChart(this.childDom().getRawDom(),opt)
            } 

            this.confmng("core",core);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

    getCore () {
        try {
            return this.confmng("core");
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
