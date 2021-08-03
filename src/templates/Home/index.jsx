import { Component } from "react";
import "./styles.css";
import { loadPosts } from "../../utils/load-posts";
import { Posts } from "../../components/Posts";
import { Button } from "../../components/Button";
import { TextIpunt } from "../../components/TextInput";
class Home extends Component {
    state = {
        posts: [],
        allPosts: [],
        page: 0,
        postsPerPage: 2,
        searchValue: "",
    };
    componentDidMount() {
        this.loadPosts();
    }

    loadPosts = async () => {
        const { pages, postsPerPage } = this.state;

        const postsAndphotos = await loadPosts();
        this.setState({
            posts: postsAndphotos.slice(pages, postsPerPage),
            allPosts: postsAndphotos,
        });
    };

    loadMorePosts = () => {
        const { page, postsPerPage, allPosts, posts } = this.state;

        const nextPage = page + postsPerPage;

        const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

        posts.push(...nextPosts);

        this.setState({ posts, page: nextPage });
    };

    handleChange = (e) => {
        const { value } = e.target;
        this.setState({ searchValue: value });
    };

    render() {
        const { posts, page, postsPerPage, allPosts, searchValue } = this.state;

        const noMorePosts = page + postsPerPage >= allPosts.length;

        const filteredPosts = !!searchValue
            ? allPosts.filter((post) => {
                  return post.title.toLowerCase().includes(searchValue.toLocaleLowerCase());
              })
            : posts;

        return (
            <section className='container'>
                <div className='search-container'>
                    {!!this.state.searchValue && <h1>search value: {searchValue} </h1>}

                    <TextIpunt searchValue={searchValue} handleChange={this.handleChange} />
                </div>

                {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}
                {filteredPosts.length === 0 && <p>Não existem posts</p>}
                <div className='button-container'>
                    {!searchValue && (
                        <Button disabled={noMorePosts} loadMorePosts={this.loadMorePosts} />
                    )}
                </div>
            </section>
        );
    }
}

export default Home;
