
const AddComment = ({ comment, setComment, submitComment }) => {

    const handleTextChange = (e) => {
        setComment((prev) => ({...prev, [e.target.name]: e.target.value}))
    }


  return (
    <div>
        <form onSubmit={submitComment} >
            <input type="text" name="comment" value={comment.comment} onChange={handleTextChange} />
            <button>Add Comment</button>
        </form>
    </div>
  )
}

export default AddComment