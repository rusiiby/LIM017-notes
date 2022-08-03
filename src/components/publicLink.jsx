import style from "../components/publicLink";

export default function PublicLink({url, title}){
    return(
        <a href={url} className={style.publicLinkContainer} >
            <div>
            {title}
            </div>
            
        </a>
    );
}

