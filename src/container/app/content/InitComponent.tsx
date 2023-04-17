import { useApplyClientState } from "@/store/client";
import { load, save } from "@/store/store";
import { Progress, ProgressComponent } from "d-react-components";
import React, { ReactNode, useEffect, useRef } from "react";
import { useStore } from "react-redux";

const InitComponent = () => {
    const store = useStore();
    const applyClientState = useApplyClientState();

    /**
     * init language
     */
    const progressRef = useRef<ReactNode>();
    useEffect(() => {
        Progress.initialProgress(progressRef.current);
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

    return (
        <div>
            <ProgressComponent ref={progressRef as any} />
        </div>
    );
};

export default InitComponent;
