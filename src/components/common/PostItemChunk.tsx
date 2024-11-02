
export const PostItemChunk = ({listItem} : {listItem : []}) => {
    return(listItem?.length > 0 ? (
        listItem.map((item) => (
            <div key={item}>{item}</div>
        ))) : (<div className="text-gray-400">None</div>)
        
    )
}