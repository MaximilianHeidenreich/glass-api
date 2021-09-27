/**
 * About:
 *      Contains logic to query the data source from filesystem.
 */
import { Store, gEvent, gEventType } from "./definitions.ts";

function getRawDataSet(): Store {
    return {
        "events": [
            {
                "timestamp": 1632225576577,
                "typ": gEventType.WLOAD,
                "pageID": "abc5a0d08550d9fdea58711015a74d1789c0fa9c9d3f92b1336988824b59a4813",
                "clientID": "3793265833",
            },
            {
                "timestamp": 1632225581259,
                "typ": gEventType.WLOAD,
                "pageID": "de5a0d08550d9fdea58711015a74d1789c0fa9c9d3f92b1336988824b59a4813",
                "clientID": "3793265833",
            },
            {
                "timestamp": 1632227054838,
                "typ": gEventType.WLOAD,
                "pageID": "fg5a0d08550d9fdea58711015a74d1789c0fa9c9d3f92b1336988824b59a4813",
                "clientID": "3793265833",
            },
            {
                "timestamp": 1632227066428,
                "typ": gEventType.WLOAD,
                "pageID": "fg5a0d08550d9fdea58711015a74d1789c0fa9c9d3f92b1336988824b59a4813",
                "clientID": "3793265833",
            },
            {
                "timestamp": 1632227164727,
                "typ": gEventType.WLOAD,
                "pageID": "hh5a0d08550d9fdea58711015a74d1789c0fa9c9d3f92b1336988824b59a4813",
                "clientID": "3793265833",
            },
            {
                "timestamp": 1632227190083,
                "typ": gEventType.WLOAD,
                "pageID": "595a0d08550d9fdea58711015a74d1789c0fa9c9d3f92b1336988824b59a4813",
                "clientID": "3793265833",
            },
            {
                "timestamp": 1632227197205,
                "typ": gEventType.WLOAD,
                "pageID": "445a0d08550d9fdea58711015a74d1789c0fa9c9d3f92b1336988824b59a4813",
                "clientID": "3793265833",
            }
        ]
    }
}


export const q = (dataSet?: Store) => {
    let ds = dataSet ? dataSet : getRawDataSet();

    return {

        // "Table" selector
        events: () => qE(ds.events)

    }
}
const qE = (ds: gEvent[]) => {
    return {
        get: () => ds,

        pageID: (id: string) => qE(ds.filter(e => e.pageID === id)),
        clientID: (id: string) => qE(ds.filter(e => e.clientID === id)),
        typ: (typ: gEventType) => qE(ds.filter(e => e.typ === typ)),
        timeRange: (begin?: Date, end?: Date) => qE(ds.filter(e => {
            let eD = new Date(e.timestamp);
            return begin ? (end ? (begin <= eD && end >= eD) : begin <= eD) : (end ? end >= eD : false) 
        }))
    }
}

const mS = (ds: gEvent[], property: string) => {
    return {
        // @ts-ignore
        eq: (val: string) => qE(ds.filter(e => e[property] === vak))
    }
}
// TODO: Create own functions for matcher
/*
m()
    .eq - equals
    .sw - startswith
    .ew - endswith
    .ct - contains
*/

//console.log(q);
// @ts-ignore
//console.log(q().events().clientID());


// @ts-ignore
//console.log(q().events().pageID("fg5a0d08550d9fdea58711015a74d1789c0fa9c9d3f92b1336988824b59a4813").get());
