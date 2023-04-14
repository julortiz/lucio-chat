const { Configuration, OpenAIApi } = require("openai")
import { useState } from "react"
import { prompt } from "../lib/questions"

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export default function Home() {
	const [loading, setLoading] = useState(false)
	// State to store the text to send and the response
	const [textSend, setSendText] = useState("")
	const [textResponse, setResponseText] = useState(
		"¡Hola! Soy Luzio, la mascota oficial de la Universidad Veracruzana. ¿En qué puedo ayudarte?"
	)

	// Function to call OpenAI API
	async function callOpenAI() {
		setLoading(true)
		try {
			const response = await openai.createChatCompletion({
				model: "gpt-4",
				temperature: 0.2,
				max_tokens: 200,
				messages: [
					{
						role: "system",
						content: prompt,
					},
					{
						role: "user",
						content: textSend,
					},
				],
			})

			console.log(response)
			setResponseText(response.data.choices[0].message.content)
			setLoading(false)
		} catch (err) {
			console.log("Error: " + err)
			setLoading(false)
			return err
		}
	}

	return (
		<div className="container p-10">
			<div className="flex flex-col">
				<div className="mb-6">
					<h1 className="text-xl">
						Soy Luzio, estoy aquí para ayudarte con preguntas sobre la UV
					</h1>
				</div>
				<div className="w-full bg-black text-white p-4 mb-6 rounded-md">
					{loading == true ? "Cargando..." : textResponse}
				</div>
				<div className="flex">
					<div className="w-5/6 pr-4">
						<input
							className="bg-slate-200 px-4 py-2 rounded w-full"
							type="text"
							onChange={(e) => setSendText(e.target.value)}
						/>
					</div>
					<div className="w-2/6">
						<button
							className="bg-slate-900 text-white px-4 py-2 rounded w-full"
							onClick={() => callOpenAI()}>
							Enviar
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
