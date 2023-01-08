export class AnimationTools {
    static animationDuration = 300;

    static smoothShow(
        setHidden: (hidden: boolean) => void,
        setDetached: (detached: boolean) => void,
        onEnded?: () => void
    ): NodeJS.Timeout {
        setDetached(false);
        setHidden(true);

        return setTimeout(() => {
            setHidden(false);

            if (onEnded) onEnded();
        }, 30);
    }

    static smoothHide(
        setHidden: (hidden: boolean) => void,
        setDetached: (detached: boolean) => void,
        onEnded?: () => void,
        duration: number = this.animationDuration
    ): NodeJS.Timeout {
        setHidden(true);
        setDetached(false);
        return setTimeout(() => {
            setDetached(true);

            if (onEnded) onEnded();
        }, duration);
    }

    static autoShowHideTransition(
        active: boolean,
        setIsDetached: (detached: boolean) => void,
        setIsHidden: (hidden: boolean) => void,
        duration?: number,
        onEnded?: () => void
    ): NodeJS.Timeout {
        if (active) {
            return AnimationTools.smoothShow(
                setIsHidden,
                setIsDetached,
                onEnded
            );
        } else {
            return AnimationTools.smoothHide(
                setIsHidden,
                setIsDetached,
                onEnded,
                duration ?? this.animationDuration
            );
        }
    }

    static activateModal(
        setIsModalActive: (active: boolean) => void,
        callback?: () => void
    ) {
        setIsModalActive(true);

        if (callback) {
            setTimeout(() => {
                callback();
            }, this.animationDuration);
        }
    }

    static deactivateModal(
        setIsModalActive: (active: boolean) => void,
        callback?: () => void
    ) {
        setIsModalActive(false);

        if (callback) {
            setTimeout(() => {
                callback();
            }, this.animationDuration);
        }
    }
}
