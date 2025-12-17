export const curriculumData = {
  "Week 1": {
    title: "Math for AI (Linear Algebra + Calculus Basics)",
    days: [
      {
        day: 1,
        topic: "Vectors & Vector Operations",
        videos: [
          { title: "Scalars, Vectors, Matrices", url: "https://www.youtube.com/watch?v=wvW4fAFUUWE" },
          { title: "Linear Algebra for AI", url: "https://www.youtube.com/watch?v=kZwSqZuBMGg" }
        ],
        practice: [
          "Add, subtract, dot-product vectors in NumPy.",
          "Create a small program that takes 2 vectors and prints similarity."
        ]
      },
      {
        day: 2,
        topic: "Matrices & Matrix Multiplication",
        videos: [
          { title: "Matrix operations for ML", url: "https://www.youtube.com/watch?v=N1Pvj4CZT1M" }
        ],
        practice: [
          "Multiply matrices in NumPy",
          "Build a matrix → vector transformation"
        ]
      },
      {
        day: 3,
        topic: "Functions & Derivatives (ML Calculus)",
        videos: [
          { title: "Derivatives explained visually", url: "https://www.youtube.com/watch?v=ygGg3RkGIIM" }
        ],
        practice: [
          "Derivative of x², 3x+5, sin(x)",
          "Plot slope using Python (matplotlib)"
        ]
      },
      {
        day: 4,
        topic: "Gradient Descent Concept",
        videos: [
          { title: "Gradient Descent Explained", url: "https://www.youtube.com/watch?v=sDv4f4s2SB8" }
        ],
        practice: [
          "Implement a SIMPLE gradient descent in Python",
          "Update w, b manually and watch loss drop"
        ]
      },
      {
        day: 5,
        topic: "ML Math Review + Mini Project",
        videos: [],
        practice: [
          "Project: Implement gradient descent to fit a straight line manually (No ML libraries)."
        ]
      }
    ]
  },
  "Week 2": {
    title: "NUMPY + PANDAS (Data Foundations)",
    days: [
      {
        day: 1,
        topic: "NumPy Basics",
        videos: [{ title: "NumPy Tutorial", url: "https://www.youtube.com/watch?v=FniLzpaSFGk" }],
        practice: ["Arrays", "Slicing", "Broadcasting", "Aggregations"]
      },
      {
        day: 2,
        topic: "Pandas Basics",
        videos: [{ title: "Pandas Full Tutorial", url: "https://www.youtube.com/watch?v=2uvysYbKdjM" }],
        practice: ["Read CSV", "Drop NA", "Replace values", "GroupBy and aggregate"]
      },
      {
        day: 3,
        topic: "Data Cleaning",
        videos: [{ title: "Pandas for Data Cleaning", url: "https://www.youtube.com/watch?v=LHBE6Q9XlzI" }],
        practice: ["Clean a messy dataset", "Convert types", "One-hot encode columns"]
      },
      {
        day: 4,
        topic: "Data Visualization (Matplotlib)",
        videos: [{ title: "Matplotlib crash course", url: "https://www.youtube.com/watch?v=3Xc3CA655Y4" }],
        practice: ["Scatter", "Line", "Histogram", "Correlation heatmap"]
      },
      {
        day: 5,
        topic: "Week Project",
        videos: [],
        practice: ["Dataset: Titanic/Iris", "Clean it", "Explore it", "Visualize it", "Summarize findings"]
      }
    ]
  },
  "Week 3": {
    title: "CORE ML CONCEPTS",
    days: [
      {
        day: 1,
        topic: "Linear Regression",
        videos: [{ title: "Linear Regression with code", url: "https://www.youtube.com/watch?v=RfB2PdGtcfg" }],
        practice: ["Fit linear regression in sklearn", "Plot predictions vs real"]
      },
      {
        day: 2,
        topic: "Loss Functions",
        videos: [{ title: "Regression basics + loss", url: "https://www.youtube.com/watch?v=JcI5Vnw0b2c" }],
        practice: ["Compute MSE manually", "Visualize loss curve"]
      },
      {
        day: 3,
        topic: "Training & Testing",
        videos: [{ title: "Regression tutorial", url: "https://www.youtube.com/watch?v=XA3OaoW86R8" }],
        practice: ["Train-test split", "Cross validation", "Model evaluation"]
      },
      {
        day: 4,
        topic: "Logistic Regression (Classification)",
        videos: [{ title: "Best intro to Logistic Regression", url: "https://www.youtube.com/watch?v=yIYKR4sgzI8" }],
        practice: ["Train a binary classifier", "Plot decision boundary"]
      },
      {
        day: 5,
        topic: "Week Project",
        videos: [],
        practice: ["Build a salary-prediction ML model", "Prepare dataset", "Train model", "Evaluate", "Export results"]
      }
    ]
  },
  "Week 4": {
    title: "CLASSICAL ML ALGORITHMS + PROJECT",
    days: [
      { day: 1, topic: "Classification Algorithms", videos: [{ title: "ML Algorithms overview", url: "https://www.youtube.com/watch?v=7kyNYMwfYdw" }], practice: ["KNN", "Decision Trees", "SVM"] },
      { day: 2, topic: "Tree Models", videos: [{ title: "ML algorithms in 17 minutes", url: "https://www.youtube.com/watch?v=E0Hmnixke2g" }], practice: ["Train decision tree", "Visualize tree", "Measure accuracy"] },
      { day: 3, topic: "KNN Classifier", videos: [{ title: "KNN explained fast", url: "https://www.youtube.com/watch?v=HVXime0nQeI" }], practice: ["Build KNN", "Compare with logistic regression"] },
      { day: 4, topic: "SVM Classifier", videos: [{ title: "SVM explained easy", url: "https://www.youtube.com/watch?v=efR1C6CvhmE" }], practice: ["Train SVM", "Visualize margins"] },
      { day: 5, topic: "Week Project (Big)", videos: [], practice: ["Choose ANY dataset", "Build a full ML pipeline"] }
    ]
  },
  "Week 5": {
    title: "Neural Network Basics",
    days: [
      { day: 1, topic: "What is a Neural Network?", videos: [{title: "Neurons, weights, bias", url: "https://www.youtube.com/watch?v=aircAruvnKk"}, {title: "Intuition of deep learning", url: "https://www.youtube.com/watch?v=bj1fh3BvqSU"}], practice: ["Build a single neuron in Python"] },
      { day: 2, topic: "Forward Propagation", videos: [{title: "How the network makes predictions", url: "https://www.youtube.com/watch?v=Ilg3gGewQ5U"}, {title: "Dot product refresher", url: "https://www.youtube.com/watch?v=TrN8I9i3BZA"}], practice: ["Implement forward pass with NumPy"] },
      { day: 3, topic: "Loss Functions", videos: [{title: "MSE, cross entropy, softmax", url: "https://www.youtube.com/watch?v=0Lio9Mt7Uo8"}], practice: ["Compute loss manually for small examples"] },
      { day: 4, topic: "Backpropagation", videos: [{title: "Backprop explained visually", url: "https://www.youtube.com/watch?v=tIeHLnjs5U8"}], practice: ["Do backprop for a 2-layer NN on paper + NumPy"] },
      { day: 5, topic: "Activation Functions", videos: [{title: "ReLU, Sigmoid, Tanh, Softmax", url: "https://www.youtube.com/watch?v=-7scQpJT7uo"}], practice: ["Implement activations + plot them"] },
      { day: 6, topic: "Gradient Descent + Optimization", videos: [{title: "Types of optimizers", url: "https://www.youtube.com/watch?v=sDv4f4s2SB8"}], practice: ["Code gradient descent manually"] },
      { day: 7, topic: "Mini Project", videos: [{title: "Guide", url: "https://www.youtube.com/watch?v=w8yWXqWQYmU"}], practice: ["Build a neural network from scratch (NumPy) to classify MNIST"] }
    ]
  },
  "Week 6": {
    title: "PyTorch Neural Networks",
    days: [
      { day: 8, topic: "PyTorch Basics", videos: [{title: "PyTorch Basics", url: "https://www.youtube.com/watch?v=V_xro1bcAuA"}], practice: ["Tensor ops on CPU + CUDA"] },
      { day: 9, topic: "Build Your First PyTorch NN", videos: [{title: "Build NN", url: "https://www.youtube.com/watch?v=SpCL87TOVpM"}], practice: ["Build a 2-layer classifier"] },
      { day: 10, topic: "Dataset + DataLoader", videos: [{title: "Dataset + DataLoader", url: "https://www.youtube.com/watch?v=6fUSlNo2a6s"}], practice: ["Load MNIST with DataLoader"] },
      { day: 11, topic: "Training Loop", videos: [{title: "Training Loop", url: "https://www.youtube.com/watch?v=EMX2dS2h15E"}], practice: ["Write full training loop"] },
      { day: 12, topic: "Model Saving & Loading", videos: [{title: "Saving & Loading", url: "https://www.youtube.com/watch?v=zp8clK9yCro"}], practice: ["Save your MNIST model"] },
      { day: 13, topic: "Overfitting + Regularization", videos: [{title: "Regularization", url: "https://www.youtube.com/watch?v=SYJ4L3WcnE8"}], practice: ["Try dropout/BatchNorm"] },
      { day: 14, topic: "Mini Project", videos: [{title: "Guide", url: "https://www.youtube.com/watch?v=5_qcR5JDJgc"}], practice: ["PyTorch MNIST classifier"] }
    ]
  },
  "Week 7": {
    title: "CNNs for Computer Vision",
    days: [
      { day: 15, topic: "Convolutions Explained Visually", videos: [{title: "Convolutions", url: "https://www.youtube.com/watch?v=KuXjwB4LzSA"}], practice: [] },
      { day: 16, topic: "CNN Layer Types", videos: [{title: "Layers", url: "https://www.youtube.com/watch?v=m8pOnJx0P0o"}], practice: ["Conv, Pool, Flatten, Dense"] },
      { day: 17, topic: "CNN Architectures", videos: [{title: "Architectures", url: "https://www.youtube.com/watch?v=DAOcjicFr1Y"}], practice: ["LeNet → AlexNet → VGG → ResNet"] },
      { day: 18, topic: "Build CNN in PyTorch", videos: [{title: "Build CNN", url: "https://www.youtube.com/watch?v=5_qcR5JDJgc"}], practice: [] },
      { day: 19, topic: "Data Augmentation", videos: [{title: "Augmentation", url: "https://www.youtube.com/watch?v=Z1xvAZve9aE"}], practice: [] },
      { day: 20, topic: "Train CNN on CIFAR-10", videos: [{title: "Train on CIFAR-10", url: "https://www.youtube.com/watch?v=OV0mYe9v2rE"}], practice: [] },
      { day: 21, topic: "Mini Project (Image Classifier)", videos: [{title: "Guide", url: "https://www.youtube.com/watch?v=ovB0fpHiykA"}], practice: ["Do an end-to-end CNN project"] }
    ]
  },
  "Week 8": {
    title: "RNN, LSTM, Sequence Models",
    days: [
      { day: 22, topic: "What Are Sequences?", videos: [{title: "Sequences", url: "https://www.youtube.com/watch?v=AsNTP8Kwu80"}], practice: [] },
      { day: 23, topic: "RNN Explained", videos: [{title: "RNN", url: "https://www.youtube.com/watch?v=eXJ3wW7QXSM"}], practice: [] },
      { day: 24, topic: "LSTM Deep Explanation", videos: [{title: "LSTM", url: "https://www.youtube.com/watch?v=YCzL96nL7j0"}], practice: [] },
      { day: 25, topic: "GRU vs LSTM", videos: [{title: "GRU vs LSTM", url: "https://www.youtube.com/watch?v=8HyCNIVRbSU"}], practice: [] },
      { day: 26, topic: "Build LSTM in PyTorch", videos: [{title: "Build LSTM", url: "https://www.youtube.com/watch?v=PNsK4mJgbb4"}], practice: [] },
      { day: 27, topic: "Text Generation Project (LSTM)", videos: [{title: "Text Gen", url: "https://www.youtube.com/watch?v=9zhrxE5PQgY"}], practice: [] },
      { day: 28, topic: "Seq2Seq + Attention Intro", videos: [{title: "Seq2Seq", url: "https://www.youtube.com/watch?v=Q2IYdwJr8wk"}], practice: [] }
    ]
  },
  "Week 9": {
    title: "NLP Fundamentals",
    days: [
      { day: 1, topic: "What is NLP?", videos: [{title: "Intro", url: "https://www.youtube.com/watch?v=8uOMragsRLo"}], practice: [] },
      { day: 2, topic: "Text Preprocessing", videos: [{title: "Preprocessing", url: "https://www.youtube.com/watch?v=u0d4gUBF8cA"}], practice: ["Tokenize, clean, stopwords"] },
      { day: 3, topic: "Word Embeddings", videos: [{title: "Embeddings", url: "https://www.youtube.com/watch?v=ERibwqs9s1w"}], practice: ["Word2Vec, GloVe"] },
      { day: 4, topic: "Contextual Embeddings", videos: [{title: "BERT", url: "https://www.youtube.com/watch?v=xI0HHN5XKDo"}], practice: [] },
      { day: 5, topic: "Sequence Models Refresher", videos: [{title: "Refresher", url: "https://www.youtube.com/watch?v=8HyCNIVRbSU"}], practice: [] },
      { day: 6, topic: "Attention Mechanism Intro", videos: [{title: "Attention", url: "https://www.youtube.com/watch?v=IkYLRw8iy8s"}], practice: [] },
      { day: 7, topic: "Mini Project", videos: [{title: "Text Class.", url: "https://www.youtube.com/watch?v=OInkQPeDdwI"}], practice: ["Text classification"] }
    ]
  },
  "Week 10": {
    title: "Transformer Architecture",
    days: [
      { day: 8, topic: "Transformer Paper", videos: [{title: "Paper", url: "https://www.youtube.com/watch?v=4Bdc55j80l8"}], practice: [] },
      { day: 9, topic: "Self-Attention", videos: [{title: "Self-Attention", url: "https://www.youtube.com/watch?v=jOmILPr7n9Y"}], practice: [] },
      { day: 10, topic: "Encoder vs Decoder", videos: [{title: "Enc vs Dec", url: "https://www.youtube.com/watch?v=cvqivXcS2cE"}], practice: [] },
      { day: 11, topic: "Positional Encoding", videos: [{title: "Pos Enc", url: "https://www.youtube.com/watch?v=VqBbgh6CHms"}], practice: [] },
      { day: 12, topic: "Multi-Head Attention", videos: [{title: "MHA", url: "https://www.youtube.com/watch?v=TCzdKRsGhQI"}], practice: [] },
      { day: 13, topic: "Transformer From Scratch", videos: [{title: "Scratch", url: "https://www.youtube.com/watch?v=TBrCGa5CzRs"}], practice: [] },
      { day: 14, topic: "Mini Project", videos: [{title: "Translation", url: "https://www.youtube.com/watch?v=6jwI4jMunSg"}], practice: ["Translate simple sentences"] }
    ]
  },
  "Week 11": {
      title: "Working with Pretrained Models & Fine-Tuning",
      days: [
          { day: 15, topic: "HuggingFace Transformers overview", videos: [{ title: "HF Overview", url: "https://www.youtube.com/watch?v=US5k2l29j1E" }], practice: [] },
          { day: 16, topic: "Tokenizers in practice", videos: [{ title: "Tokenizers", url: "https://www.youtube.com/watch?v=ercHu1aMkS0" }], practice: [] },
          { day: 17, topic: "Fine-Tuning BERT", videos: [{ title: "Fine-Tune BERT", url: "https://www.youtube.com/watch?v=V6ukK_-YRSA" }], practice: ["Classification"] },
          { day: 18, topic: "Fine-Tuning GPT", videos: [{ title: "Fine-Tune GPT", url: "https://www.youtube.com/watch?v=Zm3oiXzS5nY" }], practice: ["Generation"] },
          { day: 19, topic: "RAG Intro", videos: [{ title: "RAG", url: "https://www.youtube.com/watch?v=EjSbkJ4RrR4" }], practice: [] },
          { day: 20, topic: "Model Quantization", videos: [{ title: "Quantization", url: "https://www.youtube.com/watch?v=yVbcPiddU2I" }], practice: [] },
          { day: 21, topic: "Mini Project", videos: [{ title: "Deploy API", url: "https://www.youtube.com/watch?v=E0BIh7_Dph0" }], practice: ["Fine-tune + deploy simple API"] }
      ]
  },
  "Week 12": {
      title: "Build Your First Mini-LLM",
      days: [
          { day: 22, topic: "Tokenization pipeline", videos: [{ title: "Tokenization", url: "https://www.youtube.com/watch?v=Xrrro12Kgu8" }], practice: [] },
          { day: 23, topic: "Build small GPT", videos: [{ title: "Build GPT", url: "https://www.youtube.com/watch?v=8PzsHAKRQ9Y" }], practice: [] },
          { day: 24, topic: "Train on small dataset", videos: [{ title: "Train", url: "https://www.youtube.com/watch?v=zrGxV-TZn_0" }], practice: [] },
          { day: 25, topic: "Text Generation loop", videos: [{ title: "Gen Loop", url: "https://www.youtube.com/watch?v=XpqqjU7u5Y0" }], practice: [] },
          { day: 26, topic: "Deploy inference endpoint", videos: [{ title: "Deploy", url: "https://www.youtube.com/watch?v=1Dn2lQfE0CI" }], practice: [] },
          { day: 27, topic: "Evaluate & Improve", videos: [{ title: "Evaluate", url: "https://www.youtube.com/watch?v=Uk2KNC_Rj9Y" }], practice: [] },
          { day: 28, topic: "Final Project", videos: [{ title: "Final Project", url: "https://www.youtube.com/watch?v=w8yWXqWQYmU" }], practice: ["Build, fine-tune, deploy mini-LLM"] }
      ]
  },
  "Week 13": {
      title: "Advanced Prompt Engineering & RAG Foundations",
      days: [
          { day: 1, topic: "Prompt Engineering 2.0", videos: [], practice: ["Build a prompt library"] },
          { day: 2, topic: "Advanced Prompt Patterns", videos: [], practice: ["ReAct, Self-Consistency, Tree-of-Thoughts"] },
          { day: 3, topic: "RAG Concepts", videos: [], practice: ["Why LLMs hallucinate", "RAG vs Fine-tuning"] },
          { day: 4, topic: "Vector Embeddings Deep Dive", videos: [], practice: ["Generate embeddings for your own text corpus"] },
          { day: 5, topic: "Vector Databases Intro", videos: [], practice: ["Create a FAISS index locally"] },
          { day: 6, topic: "RAG Mini Project (Local)", videos: [], practice: ["Build your first RAG chatbot (local)"] },
          { day: 7, topic: "Evaluation & Optimization", videos: [], practice: ["Good vs bad RAG scores", "Retrieval tuning"] }
      ]
  },
  "Week 14": {
      title: "Fine-Tuning & Custom Models",
      days: [
          { day: 8, topic: "Fine-tuning Foundations", videos: [], practice: ["Full fine-tuning vs LoRA vs QLoRA"] },
          { day: 9, topic: "Intro to QLoRA Training", videos: [], practice: ["4-bit quantization", "Load 7B model"] },
          { day: 10, topic: "Dataset Formatting", videos: [], practice: ["Make your own 500-sample dataset"] },
          { day: 11, topic: "Fine-Tune a Model (Hands-On)", videos: [], practice: ["Fine-tune a 1–7B model"] },
          { day: 12, topic: "Evaluation & Testing", videos: [], practice: ["Evaluate your model vs the base model"] },
          { day: 13, topic: "Advanced Fine-Tuning Techniques", videos: [], practice: ["DPO, RLHF Lite"] },
          { day: 14, topic: "Mini Project: Fine-Tuned Assistant", videos: [], practice: ["Build your own assistant model"] }
      ]
  },
  "Week 15": {
      title: "LLM Deployment, APIs & Scaling",
      days: [
          { day: 15, topic: "Model Serving Basics", videos: [], practice: ["CPU vs GPU inference", "vLLM & FastAPI"] },
          { day: 16, topic: "Build an LLM API", videos: [], practice: ["Host your own ChatGPT-like API"] },
          { day: 17, topic: "UI Development (Frontend)", videos: [], practice: ["Your own ChatGPT clone frontend"] },
          { day: 18, topic: "Deploy Full RAG App", videos: [], practice: ["Host your RAG chatbot online"] },
          { day: 19, topic: "Caching & Rate Limiting", videos: [], practice: ["Token caching"] },
          { day: 20, topic: "Observability", videos: [], practice: ["Usage tracking", "Error analysis"] },
          { day: 21, topic: "Mini Project: Deploy Your Full LLM App", videos: [], practice: ["RAG, UI, API, Vector DB"] }
      ]
  },
  "Week 16": {
      title: "Advanced AI Engineering + Capstone",
      days: [
          { day: 22, topic: "Agents & Tools", videos: [], practice: ["LLM with live tool execution"] },
          { day: 23, topic: "Multi-Agent Systems", videos: [], practice: ["Build a 2-agent pipeline"] },
          { day: 24, topic: "Context Optimization", videos: [], practice: ["Rope Scaling, FlashAttention"] },
          { day: 25, topic: "LLM Security & Safety", videos: [], practice: ["Add guardrails to your model"] },
          { day: 26, topic: "Performance Optimization", videos: [], practice: ["Quantization (INT4/INT8)"] },
          { day: 27, topic: "Capstone Project Build Day", videos: [], practice: ["Build Personal AI tutor, Coder, or Search Engine"] },
          { day: 28, topic: "Final Testing, Deployment", videos: [], practice: ["Create GitHub repo", "Publish demo video"] }
      ]
  }
};
