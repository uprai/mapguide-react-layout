import * as React from "react";
import { connect } from "react-redux";
import {
    ICommand,
    ReduxDispatch,
    IApplicationState,
    IToolbarReducerState,
    IViewReducerState,
    ISelectionReducerState,
    IMapReducerState
} from "../api/common";
import { getCommand, mapToolbarReference } from "../api/registry/command";
import { IItem, IMenu, Toolbar, DEFAULT_TOOLBAR_SIZE } from "../components/toolbar";
import { invokeCommand } from "../actions/map";
import { processMenuItems } from "../utils/menu";

export interface IToolbarContainerProps {
    id: string;
    vertical?: boolean;
    containerClass?: string;
    containerStyle?: React.CSSProperties;
}

export interface IToolbarContainerState {
    map?: IMapReducerState;
    toolbar?: IToolbarReducerState;
    view?: IViewReducerState;
    selection?: ISelectionReducerState;
}

export interface IToolbarContainerDispatch {
    invokeCommand?: (cmd: ICommand) => void;
}

function mapStateToProps(state: IApplicationState, ownProps: IToolbarContainerProps): IToolbarContainerState {
    return {
        map: state.map,
        view: state.view,
        selection: state.selection,
        toolbar: state.toolbar[ownProps.id]
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): IToolbarContainerDispatch {
    return {
        invokeCommand: (cmd) => dispatch(invokeCommand(cmd))
    };
}

export type ToolbarContainerProps = IToolbarContainerProps & IToolbarContainerState & IToolbarContainerDispatch;

@connect(mapStateToProps, mapDispatchToProps)
export class ToolbarContainer extends React.Component<ToolbarContainerProps, any> {
    constructor(props: ToolbarContainerProps) {
        super(props);
    }
    static contextTypes: React.ValidationMap<any> = {
        store: React.PropTypes.object
    };
    render(): JSX.Element {
        const { toolbar, containerClass, containerStyle, vertical, invokeCommand } = this.props;
        const store = (this.context as any).store;
        if (toolbar && toolbar.items && invokeCommand && containerStyle) {
            if (vertical === true) {
                containerStyle.width = DEFAULT_TOOLBAR_SIZE;
            } else {
                containerStyle.height = DEFAULT_TOOLBAR_SIZE;
                containerStyle.overflow = "auto";
            }
            const items = (toolbar.items as any[]).map(tb => mapToolbarReference(tb, store, invokeCommand));
            const childItems = processMenuItems(items);
            return <Toolbar vertical={vertical} childItems={childItems} containerClass={containerClass} containerStyle={containerStyle} />;
        } else {
            return <div />;
        }
    }
}