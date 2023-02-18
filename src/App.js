import React from "react"
import "./App.css"
import mondaySdk from "monday-sdk-js"
import "monday-ui-react-core/dist/main.css"

//Explore more Monday React Components here: https://style.monday.com/
import { Button } from "monday-ui-react-core"

// Usage of mondaySDK example, for more information visit here: https://developer.monday.com/apps/docs/introduction-to-the-sdk/
const monday = mondaySdk()

const App = () => {
  async function capitalizeText() {
    try {
      monday.execute("valueCreatedForUser")

      // set context
      const currentContext = await monday.get("context")
      const currentBlock =
        currentContext.data.focusedBlocks[0].content.deltaFormat
      const range = currentContext.data.range
      alert(range)
      const newBlock = []
      currentBlock.forEach(async (currentWord) => {
        let firstPart = currentWord.insert.substr(0, range.index)
        let lastPart = currentWord.insert.substr(range.index + range.length)
        let newString =
          firstPart +
          currentContext.data.highlightedText.toUpperCase() +
          lastPart
        const newWord = {
          insert: newString,
          attributes: currentWord.attributes,
        }
        newBlock.push(newWord)
      })

      const id = currentContext.data.focusedBlocks[0].id
      const content = {
        deltaFormat: newBlock,
      }
      const data = await monday.execute("updateDocBlock", { id, content })
      await monday.execute("closeDocModal")
      return data
    } catch (error) {
      console.log(`There was an error: ${error}`)
    }
  }

  return (
    <div className="App">
      <Button onClick={() => capitalizeText()}>Capitalize</Button>
    </div>
  )
}

export default App
