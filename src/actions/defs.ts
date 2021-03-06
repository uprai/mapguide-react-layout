/**
 * defs.ts
 * 
 * Redux action definitions
 */

import { IDOMElementMetrics, IMapView, Dictionary, IExternalBaseLayer, IModalComponentDisplayOptions, IModalDisplayOptions, UnitOfMeasure, ActiveMapTool } from '../api/common';
import { ActionType } from '../constants/actions';
import { PreparedSubMenuSet } from '../api/registry/command-spec';
import { RuntimeMap } from '../api/contracts/runtime-map';
import { QueryMapFeaturesResponse } from '../api';

/**
 * Opens a flyout menu
 * 
 * @since 0.12
 */
export interface IOpenFlyoutAction {
    type: ActionType.FLYOUT_OPEN;
    payload: {
        flyoutId: string;
        metrics: IDOMElementMetrics;
    }
}

/**
 * Closes a flyout menu
 * 
 * @since 0.12
 */
export interface ICloseFlyoutAction {
    type: ActionType.FLYOUT_CLOSE;
    payload: {
        flyoutId: string;
    }
}

/**
 * Opens a registered component in the given flyout
 * 
 * @since 0.12
 */
export interface IOpenComponentInFlyoutAction {
    type: ActionType.COMPONENT_OPEN;
    payload: {
        flyoutId: string;
        metrics: IDOMElementMetrics;
        name: string;
        props: any;
    }
}

/**
 * Closes a registered component in the given flyout
 *
 * @since 0.12
 */
export interface ICloseComponentInFlyoutAction {
    type: ActionType.COMPONENT_CLOSE;
    payload: {
        flyoutId: string;
    }
}

/**
 * @since 0.12
 */
export type MapInfo = {
    mapGroupId: string;
    map: RuntimeMap;
    initialView: IMapView | undefined;
    externalBaseLayers: IExternalBaseLayer[];
}

/**
 * @since 0.12
 */
export interface IRestoredSelectionSets {
    [mapName: string]: QueryMapFeaturesResponse;
}

/**
 * @since 0.12
 */
export interface IInitAppActionPayload {
    activeMapName: string;
    initialView?: IMapView;
    initialUrl: string;
    initialTaskPaneWidth?: number;
    initialInfoPaneWidth?: number;
    locale: string;
    maps: Dictionary<MapInfo>;
    config: any;
    capabilities: {
        hasTaskPane: boolean,
        hasTaskBar: boolean,
        hasStatusBar: boolean,
        hasNavigator: boolean,
        hasSelectionPanel: boolean,
        hasLegend: boolean,
        hasToolbar: boolean,
        hasViewSize: boolean
    },
    initialShowLayers?: string[];
    initialShowGroups?: string[];
    initialHideLayers?: string[];
    initialHideGroups?: string[];
    toolbars: PreparedSubMenuSet;
    warnings: string[];
    /**
     * @since 0.12
     */
    initialSelections?: IRestoredSelectionSets;
}

/**
 * Initializes the viewer application
 *
 * @since 0.12
 */
export interface IInitAppAction {
    type: ActionType.INIT_APP;
    payload: IInitAppActionPayload;
}

export interface IInitErrorAction {
    type: ActionType.INIT_ERROR,
    payload: {
        error: {
            message: string;
            stack: string[];
        },
        includeStack?: boolean;
        options: any;
    }
}

export interface IAcknowledgeStartupWarningsAction {
    type: ActionType.INIT_ACKNOWLEDGE_WARNINGS;
}

export interface IElementState {
    legendVisible: boolean;
    taskPaneVisible: boolean;
    selectionPanelVisible: boolean;
}

/**
 * @since 0.12
 */
export interface ITemplateSetElementStateAction {
    type: ActionType.FUSION_SET_ELEMENT_STATE;
    payload: IElementState;
}

/**
 * @since 0.12
 */
export interface ITemplateSetTaskPaneVisibilityAction {
    type: ActionType.FUSION_SET_TASK_PANE_VISIBILITY;
    payload: boolean;
}

/**
 * @since 0.12
 */
export interface ITemplateSetSelectionPanelVisibility {
    type: ActionType.FUSION_SET_SELECTION_PANEL_VISIBILITY;
    payload: boolean;
}

/**
 * @since 0.12
 */
export interface ITemplateSetLegendVisibility {
    type: ActionType.FUSION_SET_LEGEND_VISIBILITY;
    payload: boolean;
}

/**
 * @since 0.12
 */
export interface ITaskPaneBackAction {
    type: ActionType.TASK_PANE_BACK;
}

/**
 * @since 0.12
 */
export interface ITaskPaneForwardAction {
    type: ActionType.TASK_PANE_FORWARD;
}

/**
 * Pushes the given URL to the task pane navigation history stack
 * 
 * @since 0.12
 */
export interface ITaskPanePushUrlAction {
    type: ActionType.TASK_PANE_PUSH_URL;
    payload: {
        url: string;
        silent?: boolean;
    }
}

/**
 * @since 0.12
 */
export interface ITaskPaneInvokeUrlAction {
    type: ActionType.TASK_INVOKE_URL,
    payload: {
        url: string;
    }
}

/**
 * @since 0.12
 */
export interface ITaskPaneHomeAction {
    type: ActionType.TASK_PANE_HOME;
}

/**
 * @since 0.12
 */
export interface IShowComponentInModalAction {
    type: ActionType.MODAL_SHOW_COMPONENT;
    payload: IModalComponentDisplayOptions;
}

/**
 * @since 0.12
 */
export interface IShowModalUrlAction {
    type: ActionType.MODAL_SHOW_URL;
    payload: IModalDisplayOptions;
}

/**
 * @since 0.12
 */
export interface ICloseModalAction {
    type: ActionType.MODAL_CLOSE;
    payload: string;
}

/**
 * @since 0.12
 */
export interface IMapSetBusyCountAction {
    type: ActionType.MAP_SET_BUSY_COUNT;
    payload: number;
}

/**
 * @since 0.12
 */
export interface IMapSetBaseLayerAction {
    type: ActionType.MAP_SET_BASE_LAYER;
    payload: {
        mapName: string;
        layerName: string;
    }
}

/**
 * @since 0.12
 */
export interface IMapSetScaleAction {
    type: ActionType.MAP_SET_SCALE;
    payload: {
        mapName: string;
        scale: number;
        resolution?: number;
    }
}

/**
 * @since 0.12
 */
export interface IMapSetMouseCoordinatesAction {
    type: ActionType.UPDATE_MOUSE_COORDINATES;
    payload: {
        mapName: string;
        coord: any;
    }
}

/**
 * @since 0.12
 */
export interface IMapSetLayerTransparencyAction {
    type: ActionType.MAP_SET_LAYER_TRANSPARENCY;
    payload: {
        mapName: string;
        layerName: string;
        opacity: number;
    }
}

/**
 * @since 0.12
 */
export interface IMapSetViewSizeUnitsAction {
    type: ActionType.MAP_SET_VIEW_SIZE_UNITS;
    payload: UnitOfMeasure;
}

/**
 * @since 0.12
 */
export interface IMapPreviousViewAction {
    type: ActionType.MAP_PREVIOUS_VIEW;
    payload: {
        mapName: string;
    }
}

/**
 * @since 0.12
 */
export interface IMapNextViewAction {
    type: ActionType.MAP_NEXT_VIEW;
    payload: {
        mapName: string;
    }
}

/**
 * @since 0.12
 */
export interface IMapSetSelectionAction {
    type: ActionType.MAP_SET_SELECTION;
    payload: {
        mapName: string;
        selection: any
    }
}

/**
 * @since 0.12
 */
export interface IMapResizedAction {
    type: ActionType.MAP_RESIZED;
    payload: {
        width: number;
        height: number;
    }
}

/**
 * @since 0.12
 */
export interface IMapSetViewAction {
    type: ActionType.MAP_SET_VIEW;
    payload: {
        mapName: string;
        view: IMapView;
    }
}

/**
 * @since 0.12
 */
export interface ISetActiveMapToolAction {
    type: ActionType.MAP_SET_ACTIVE_TOOL;
    payload: ActiveMapTool;
}

/**
 * @since 0.12
 */
export interface ISetActiveMapAction {
    type: ActionType.MAP_SET_ACTIVE_MAP;
    payload: string;
}

/**
 * @since 0.12
 */
export interface ISetFeatureTooltipsEnabledAction {
    type: ActionType.MAP_SET_MAPTIP;
    payload: boolean;
}

/**
 * @since 0.12
 */
export interface ISetManualFeatureTooltipsEnabledAction {
    type: ActionType.MAP_SET_MANUAL_MAPTIP;
    payload: boolean;
}

/**
 * @since 0.12
 */
export interface IMapSetViewRotationAction {
    type: ActionType.MAP_SET_VIEW_ROTATION;
    payload: number;
}

/**
 * @since 0.12
 */
export interface IMapSetViewRotationEnabledAction {
    type: ActionType.MAP_SET_VIEW_ROTATION_ENABLED;
    payload: boolean;
}

/**
 * @since 0.12
 */
export interface IShowSelectedFeatureAction {
    type: ActionType.MAP_SHOW_SELECTED_FEATURE;
    payload: {
        mapName: string;
        layerId: string;
        featureIndex: number;
    }
}

/**
 * @since 0.12
 */
export interface ILegendSetGroupVisibilityAction {
    type: ActionType.LEGEND_SET_GROUP_VISIBILITY;
    payload: {
        id: string;
        value: boolean;
        mapName: string;
    }
}

/**
 * @since 0.12
 */
export interface ILegendSetLayerVisibilityAction {
    type: ActionType.LEGEND_SET_LAYER_VISIBILITY;
    payload: {
        id: string;
        value: boolean;
        mapName: string;
    }
}

/**
 * @since 0.12
 */
export interface ILegendSetGroupExpandedAction {
    type: ActionType.LEGEND_SET_GROUP_EXPANDABLE;
    payload: {
        id: string;
        value: boolean;
        mapName: string;
    }
}

/**
 * @since 0.12
 */
export interface ILegendSetGroupSelectableAction {
    type: ActionType.LEGEND_SET_LAYER_SELECTABLE;
    payload: {
        id: string;
        value: boolean;
        mapName: string;
    }
}

/**
 * @since 0.12
 */
export interface IMapRefreshAction {
    type: ActionType.MAP_REFRESH;
    payload: {
        mapName: string,
        map: RuntimeMap
    }
}

/**
 * @since 0.12
 */
export type ViewerAction = IOpenFlyoutAction 
    | ICloseFlyoutAction
    | IOpenComponentInFlyoutAction
    | ICloseComponentInFlyoutAction
    | IInitAppAction
    | IInitErrorAction
    | IAcknowledgeStartupWarningsAction
    | ITemplateSetElementStateAction
    | ITemplateSetTaskPaneVisibilityAction
    | ITemplateSetSelectionPanelVisibility
    | ITemplateSetLegendVisibility
    | ITaskPaneBackAction
    | ITaskPaneForwardAction
    | ITaskPanePushUrlAction
    | ITaskPaneInvokeUrlAction
    | ITaskPaneHomeAction
    | IShowComponentInModalAction
    | IShowModalUrlAction
    | ICloseModalAction
    | IMapSetBusyCountAction
    | IMapSetBaseLayerAction
    | IMapSetScaleAction
    | IMapSetMouseCoordinatesAction
    | IMapSetLayerTransparencyAction
    | IMapSetViewSizeUnitsAction
    | IMapPreviousViewAction
    | IMapNextViewAction
    | IMapSetSelectionAction
    | IMapResizedAction
    | IMapSetViewAction
    | ISetActiveMapToolAction
    | ISetActiveMapAction
    | ISetFeatureTooltipsEnabledAction
    | ISetManualFeatureTooltipsEnabledAction
    | IMapSetViewRotationAction
    | IMapSetViewRotationEnabledAction
    | IShowSelectedFeatureAction
    | ILegendSetGroupVisibilityAction
    | ILegendSetLayerVisibilityAction
    | ILegendSetGroupExpandedAction
    | ILegendSetGroupSelectableAction
    | IMapRefreshAction