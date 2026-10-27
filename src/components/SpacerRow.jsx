// Section 9 `spacer-row`: 128px empty bordered row, hidden below lg.
export default function SpacerRow() {
  return (
    <div className="bg-white-100 max-lg:hidden" data-section="spacer-row">
      <div className="lg-container">
        <div className="h-32 border-x border-solid border-white-500" />
      </div>
    </div>
  )
}
