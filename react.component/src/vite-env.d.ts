/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

function forwardRef<T, P = {}>(
  Component: RefForwardingComponent<T, P>
): ComponentType<P & ClassAttributes<T>>
