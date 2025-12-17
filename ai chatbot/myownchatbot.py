from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
model = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    api_key="AIzaSyBL4ML4K3qeci6exzIt87Wle8XueOkjqhk",
    temperature=0.7,
)
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful AI assistant."),
    ("human", "{input}")
])
chain = prompt | model | StrOutputParser()
print("sabari ready. Type 'exit' to quit.\n")
while True:
    user_input = input("You: ")
    if user_input.lower() == "exit":
        print("sabari: Bye!")
        break
    response = chain.invoke({"input": user_input})
    print("sabari:", response)