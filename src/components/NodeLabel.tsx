const NodeLabel: React.FC<{className: string, nodeData: { name: string }}> = (props) => {
  return (
    <div
      className={props.className}
      style={{
        background: "#ffffff",
        height: "70px",
        borderTop: "2px solid #2F80ED",
        textAlign: "center",
        zIndex: "1000",
        boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.1)",
        padding: "5px 0",
        borderRadius: "5px"
      }}
    >
      {props.nodeData.name}
    </div>
  )
}

export default NodeLabel