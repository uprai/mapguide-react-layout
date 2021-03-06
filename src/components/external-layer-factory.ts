import { MgError } from "../api/error";
import { IExternalBaseLayer } from "../api/common";
import olSource from "ol/source/source";
import XYZ from "ol/source/xyz";
import OSM from "ol/source/osm";
import Stamen from "ol/source/stamen";
import BingMaps from "ol/source/bingmaps";

interface OLSourceCtor {
    new (options?: any): olSource;
}

/**
 * Creates an OpenLayers source based on the given external base layer definition
 *
 * @export
 * @param {IExternalBaseLayer} layer
 * @returns
 */
export function createExternalSource(layer: IExternalBaseLayer): olSource {
    let sourceCtor: OLSourceCtor;

    switch (layer.kind) {
        case "XYZ":
            sourceCtor = XYZ;
            break;
        case "OSM":
            sourceCtor = OSM;
            break;
        case "Stamen":
            sourceCtor = Stamen;
            break;
        case "BingMaps":
            sourceCtor = BingMaps;
            break;
        default:
            throw new MgError(`Unknown external base layer provider: ${layer.kind}`);
    }
    if (typeof(layer.options) != 'undefined')
        return new sourceCtor(layer.options);
    else
        return new sourceCtor();
}