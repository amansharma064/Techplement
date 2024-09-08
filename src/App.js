import React from "react";
import axios from "axios";
import "./App.css";

class App extends React.Component {
    state = {
        quote: "",
        author: "",
        searchQuery: "",
        searchResults: []
    };

    componentDidMount() {
        this.fetchRandomQuote();
    }

    fetchRandomQuote = () => {
        axios
            .get("https://api.quotable.io/random")
            .then((response) => {
                const { content, author } = response.data;
                this.setState({ quote: content, author });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    handleInputChange = (event) => {
        this.setState({ searchQuery: event.target.value });
    };

    searchByAuthor = () => {
        axios
            .get(`https://api.quotable.io/quotes?author=${this.state.searchQuery}`)
            .then((response) => {
                this.setState({ searchResults: response.data.results });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    render() {
        const { quote, author, searchQuery, searchResults } = this.state;

        return (
            <div className="app">
                <div className="card">
                    <h1 className="heading">Random Quote</h1>
                    <p className="quote">{quote}</p>
                    <p className="author">- {author}</p>
                    <button className="button" onClick={this.fetchRandomQuote}>
                        <span>Get Random Quote</span>
                    </button>
                </div>

                <div className="search-section">
                    <input
                        type="text"
                        className="search-input"
                        value={searchQuery}
                        onChange={this.handleInputChange}
                        placeholder="Search by Author"
                    />
                    <button className="button" onClick={this.searchByAuthor}>
                        <span>Search</span>
                    </button>

                    {searchResults.length > 0 && (
                        <div className="results">
                            <h2 className="heading">Search Results</h2>
                            {searchResults.map((quote) => (
                                <div key={quote._id} className="quote-card">
                                    <p className="quote">{quote.content}</p>
                                    <p className="author">- {quote.author}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default App;
