const askLLM = require('./askLLM')

// return updated prompt with new info added
const useTool = async (prompt, tool, arg = null) => {
    prompt += "\ntool output:"
    if (tool == 'getDateTime') {
        const now = new Date();
        prompt += ` DateTime:${now.toLocaleString()}`
    }
    if (tool == 'getCity') {
        prompt+= ' City:Mumbai' // hardcoded to bom for now
    }

    if (tool == 'getWeather'){
        // tools should look like {'getWeather', ['mumbai']}
        const city = arg
        const url = `https://wttr.in/${city}?format=3`;
    let response = await fetch(url);
    const text = await response.text();
    prompt+=` Weather:${text}`
    }

    prompt += "\nAnswer:";
    return prompt
}

// Internet of Things Retrieve Augmented Generation

const IoTRAG = async (prompt, tool = null, arg = null) => {
    // base case, if no tools needed, return simple LLM response
    if (tool == null){
        let basicResponse = await askLLM(prompt)
        try {
            basicResponse = JSON.parse(basicResponse)
            if (basicResponse.tool) return await IoTRAG(prompt, basicResponse.tool, basicResponse.arg)
        } catch (error) {
            return basicResponse
        }
    }
        const userText = prompt.split("user:")[1]?.trim();
        prompt = await useTool(userText, tool, arg)

        let newResponse = await askLLM(`answer the query in short based on the given info: ${prompt}`)
        return newResponse


}
module.exports = IoTRAG