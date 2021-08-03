import "./styles.css";
export const Button = (props) => {
    const { loadMorePosts, disabled } = props;
    return (
        <div>
            <button disabled={disabled} className='button' onClick={() => loadMorePosts()}>
                {" "}
                Load more Posts!{" "}
            </button>
        </div>
    );
};
