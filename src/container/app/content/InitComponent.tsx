import { useApplyClientState } from "@/store/client";
import { load, save } from "@/store/store";
import AOS from "aos";
import "aos/dist/aos.css";
import {
    DialogComponent,
    DialogManager,
    Progress,
    ProgressComponent,
} from "d-react-components";
import { forEach, isArray, isEmpty } from "lodash";
import React, { ReactNode, useEffect, useRef } from "react";
import { useStore } from "react-redux";

const InitComponent = () => {
    const store = useStore();
    const applyClientState = useApplyClientState();

    /**
     * init language
     */
    const progressRef = useRef<ReactNode>();
    const dialogRef = useRef<ReactNode>();
    useEffect(() => {
        Progress.initialProgress(progressRef.current);
        DialogManager.initialDialog(dialogRef.current);
    }, []);

    useEffect(() => {
        AOS.init();
    }, []);

    // preloader language
    // Messages.setLanguage(locale);
    // useEffect(() => {
    //     document.documentElement.lang = locale;
    //     document.documentElement.dir = direction;
    // }, [direction, locale]);

    // Loading and saving state on the client side (cart, wishlist, etc.).
    useEffect(() => {
        const state = load();

        if (state) {
            applyClientState(state);
        }

        if (process.browser) {
            store.subscribe(() => {
                save(store.getState());
            });
        }
    }, [store]);

    const progressTransformError = (error: any) => {
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

    return (
        <div>
            <ProgressComponent
                ref={progressRef as any}
                transformError={progressTransformError}
            />
            <DialogComponent ref={dialogRef as any} />
        </div>
    );
};

export default InitComponent;
