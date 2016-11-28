import * as React from "react";
import { connect } from "react-redux";
import { getLayout } from "../api/registry/layout";
import {
    IExternalBaseLayer,
    ReduxDispatch,
    IApplicationState,
    IConfigurationReducerState,
    IInitErrorReducerState,
    ClientKind,
    InitError
} from "../api/common";
import { initLayout } from "../actions/init";
import { Error, normalizeStack } from "../components/error";
import { tr } from "../api/i18n";

export interface IAppProps {
    layout: string;
    /**
     * Agent configuration 
     * 
     * @type {{
     *         uri: string,
     *         kind?: ClientKind
     *     }}
     */
    agent: {
        uri: string,
        kind?: ClientKind
    },
    /**
     * A resource id to a Map Definition or Application Definition. If passing a Map Definition,
     * a default viewer layout will be created 
     * 
     * @type {string}
     */
    resourceId: string;
    externalBaseLayers?: IExternalBaseLayer[];
}

export interface IAppState {
    error?: InitError;
    includeStack?: boolean;
    initOptions?: any;
    config?: IConfigurationReducerState;
}

export interface IInitAppLayout {
    resourceId: string;
    externalBaseLayers?: IExternalBaseLayer[];
}

export interface IAppDispatch {
    initApp?: (args: any) => void;
    initLayout?: (args: IInitAppLayout) => void;
}

function mapStateToProps(state: IApplicationState): IAppState {
    return {
        error: state.initError.error,
        includeStack: state.initError.includeStack,
        initOptions: state.initError.options,
        config: state.config
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): IAppDispatch {
    return {
        initLayout: (args) => dispatch(initLayout(args))
    };
}

export type AppProps = IAppProps & IAppState & IAppDispatch;

@connect(mapStateToProps, mapDispatchToProps)
export class App extends React.Component<AppProps, any> {
    private fnErrorRenderer: (err: Error) => JSX.Element;
    constructor(props: AppProps) {
        super(props);
        this.fnErrorRenderer = this.initErrorRenderer.bind(this);
    }
    componentDidMount() {
        const { initApp, initLayout, agent, resourceId, externalBaseLayers } = this.props;
        if (initLayout) {
            initLayout({
                resourceId: resourceId,
                externalBaseLayers: externalBaseLayers
            });
        }
    }
    private renderErrorMessage(err: Error|InitError, locale: string, args: any): JSX.Element {
        const msg = err.message;
        switch (msg) {
            case "MgConnectionFailedException":
                {
                    const arg = { __html: tr("INIT_ERROR_NO_CONNECTION", locale) };
                    return <div dangerouslySetInnerHTML={arg} />;
                }
            case "MgResourceNotFoundException":
                {
                    const arg = { __html: tr("INIT_ERROR_RESOURCE_NOT_FOUND", locale, { resourceId: args.resourceId }) };
                    return <div dangerouslySetInnerHTML={arg} />;
                }
            case "MgSessionExpiredException":
                {
                    const arg = { __html: tr("INIT_ERROR_EXPIRED_SESSION", locale, { sessionId: args.session }) };
                    return <div dangerouslySetInnerHTML={arg} />;
                }
            default:
                {
                    const arg = { __html: msg };
                    const stack = normalizeStack(err);
                    return <div>
                        <div dangerouslySetInnerHTML={arg} />
                        {(() => {
                            if (this.props.includeStack === true && stack.length > 0) {
                                return <div>
                                    <p>Stack Trace</p>
                                    <ul>
                                        {stack.map((ln, i) => <li key={`stack-line-${i}`}>{ln}</li>)}
                                    </ul>
                                </div>;
                            }
                        })()}
                    </div>;
                }
        }
    }
    private initErrorRenderer(err: Error|InitError): JSX.Element {
        const { config, initOptions } = this.props;
        let locale = config ? (config.locale || "en") : "en";
        if (initOptions && initOptions.locale) {
            locale = initOptions.locale;
        }
        //Not showing stack as the error cases are well-defined here and we know where they
        //originate from
        return <div className="pt-callout pt-intent-danger">
            <h5>{tr("INIT_ERROR_TITLE", locale)}</h5>
            {this.renderErrorMessage(err, locale, initOptions || {})}
        </div>;
    }
    render(): JSX.Element {
        const { layout, config, error } = this.props;
        const layoutEl = getLayout(layout);
        if (error) {
            return <Error error={error} errorRenderer={this.fnErrorRenderer} />
        } else {
            //NOTE: Locale may not have been set at this point, so use default
            const locale = config ? (config.locale || "en") : "en";
            if (layoutEl) {
                return layoutEl();
            } else {
                return <Error error={tr("ERR_UNREGISTERED_LAYOUT", locale, { layout: layout })} />;
            }
        }
    }
}