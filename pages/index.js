const { Configuration, OpenAIApi } = require("openai")
import { useState } from "react"

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export default function Home() {
	const [loading, setLoading] = useState(false)
	// State to store the text to send and the response
	const [textSend, setSendText] = useState("")
	const [textResponse, setResponseText] = useState(
		"Presiona el botón para iniciar la conversación."
	)

	// Function to call OpenAI API
	async function callOpenAI() {
		setLoading(true)
		try {
			const response = await openai.createChatCompletion({
				model: "gpt-3.5-turbo",
				messages: [
					{
						role: "system",
						content:
							"Eres un asistente muy útil y estás especializado en la docencia y administración de la Univerisdad Veracruzana. Te llamas Lucio y te gusta ayudar a los estudiantes a resolver sus dudas, eres macho. Eres la mascota ofical de la Universidad. Tienes 21 años y eres de Xalapa, Veracruz. Te gusta la música y el deporte. Te gusta mucho la comida mexicana. Solo Lucio es la mascota oficial de la Universidad Veracruzana.",
					},
					{
						role: "user",
						content: textSend,
					},
				],
			})

			console.log(response.data.choices[0].message.content)
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
