var onRun = function(context) {
    let sketch = require('sketch')
    let ShapePath = sketch.ShapePath
    let Group = sketch.Group
    let document = sketch.getSelectedDocument()
    let selection = document.selectedLayers.layers

    if (selection.length == 0) {
      sketch.UI.message('🎭: Please select at least one layer.')
    }

    if (selection.length > 1) {
        let group = new Group({
            layers: selection,
            parent: selection[0].parent
        })

        group.adjustToFit()
        document.selectedLayers.clear()
        group.selected = true
        selection = [group]
    }

    let mask = new ShapePath({
        name: "Mask",
        frame: selection[0].frame,
        style: {
            fills: [],
            borders: []
        },
        parent: selection[0].parent
    })

    mask.moveBackward()
    mask.selected = true

    document.sketchObject.actionsController().actionForID("MSMaskWithShapeAction").performAction(nil)

    document.selectedLayers.clear()
    mask.selected = true
};
