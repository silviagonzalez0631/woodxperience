    import React, { useRef, useEffect } from "react";

    interface Props extends React.HTMLAttributes<HTMLElement> {
    src: string;
    alt?: string;
    autoRotate?: boolean;
    cameraControls?: boolean;
    style?: React.CSSProperties;
    }

    const ModelViewer: React.FC<Props> = ({
    src,
    alt,
    autoRotate = true,
    cameraControls = true,
    style,
    ...rest
    }) => {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!customElements.get("model-viewer")) {
        import("@google/model-viewer");
        }
    }, []);

    return React.createElement("model-viewer", {
        ref,
        src,
        alt,
        autoRotate,
        cameraControls,
        style,
        ...rest,
    });
    };

    export default ModelViewer;
