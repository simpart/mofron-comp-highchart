/**
 * @file mofron-comp-jspreadsheet/index.js
 * @brief jspreadsheet component for mofron
 * @license MIT
 */
const Highcharts = require('highcharts'); 

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
	    
            this.confmng().add("core", { type: "object" });
            this.confmng().add("type", { type:"string", init:"line", select:["line", "bar", "area", "pie"] });
            this.confmng().add("option", { type: "object" });
            this.confmng().add("title",  { type: "string" });
            this.confmng().add("series", { type: "object", list: true });
            this.confmng().add("yAxis", { type: "object" });

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
	    let opt = {
                chart: {
                    type: this.type()
		},
                title: {
                    text: this.title()
                },
		yAxis: this.yAxis(),
		legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },
                series: this.series()
	    };
            this.confmng(
                "core",
                Highcharts.chart(this.childDom().getRawDom(),opt)
            );
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
