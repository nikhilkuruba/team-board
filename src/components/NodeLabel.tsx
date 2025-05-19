const NodeLabel: React.FC<{className: string, nodeData: { name: string }}> = (props) => {
  return (
    <div
      className={props.className}
      style={{
        background: "var(--color-white)",
        height: "70px",
        borderTop: "2px solid var(--color-node-border)",
        textAlign: "center",
        zIndex: "1000",
        boxShadow: "0px 10px 10px var(--color-node-shadow)",
        padding: "5px 0",
        borderRadius: "5px"
      }}
    >
      {props.nodeData.name}
    </div>
  )
}

export default NodeLabel