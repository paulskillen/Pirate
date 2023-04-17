import Messages from "@/languages/Messages";
import { applyClientState } from "@/store/client";
import { load, save, store } from "@/store/store";
import {
    DialogComponent,
    DialogManager,
    Loading,
    Progress,
    ProgressComponent,
    UrlUtils,
} from "d-react-components";
import { forEach, isArray, isEmpty } from "lodash";
// import Lottie from "lottie-react";
import React, { Component } from "react";

class InitComponent extends Component<any> {
    progressRef: any;

    dialogRef: any;

    constructor(props: any) {
        super(props);
        this.onInitialLanguage();
        this.progressRef = null;
        this.dialogRef = null;
    }

    componentDidMount() {
        Progress.initialProgress(this.progressRef);
        DialogManager.initialDialog(this.dialogRef);
        this.loadStore();
    }

    loadStore() {
        const state = load();

        if (state) {
            applyClientState(state);
        }

        if (process.browser) {
            store.subscribe(() => {
                save(store.getState());
            });
        }
    }

    onInitialLanguage = () => {
        if (!process.browser) {
            return undefined;
        }
        const { locale = "en" } = UrlUtils.getQuery();
        Messages.setLanguage(locale as string);
    };

    progressTransformError = (error: any) => {
        const { graphQLErrors = [], message } = error;
        let errorView: string = "";
        if (!isEmpty(message)) {
            errorView += `${message}<br>`;
        }
        forEach(graphQLErrors, (error) => {
            if (isArray(error.states)) {
                forEach(error?.states ?? [], (item) => {
                    errorView += `${item?.message}<br>`;
                });
            } else {
                errorView += `${error?.states?.message}<br>`;
            }
        });

        return errorView;
    };

    render() {
        return (
            <div>
                <ProgressComponent
                    ref={(ref) => {
                        this.progressRef = ref;
                    }}
                    transformError={this.progressTransformError}
                    loadingView={
                        <div className="flex-center flex-column">
                            <Loading size="medium" />
                            {/* <Lottie
                                animationData={MaskLottie}
                                style={{ height: 150, width: 150 }}
                            /> */}
                            <small className="text-white">
                                #keepcalmNwearmask
                            </small>
                        </div>
                    }
                />
                <DialogComponent
                    ref={(ref) => {
                        this.dialogRef = ref;
                    }}
                />
            </div>
        );
    }
}

export default InitComponent;
