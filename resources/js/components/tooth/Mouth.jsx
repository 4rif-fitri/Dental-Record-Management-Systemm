import { useGLTF } from "@react-three/drei";

export default function Mouth({
    model,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = [1, 1, 1]
}) {

    const { scene } = useGLTF(model);

    return (
        <primitive
            object={scene}
            position={position}
            rotation={rotation}
            scale={scale}
        />
    );

}
