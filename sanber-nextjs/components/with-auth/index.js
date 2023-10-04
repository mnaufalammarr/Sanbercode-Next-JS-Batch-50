export default function withAuth(Component) {
    return function WithAuth(props){
        const isLogin = true;
        if(isLogin){
            return <Component {...props} />
        }else{
            return <div>Anda belum login</div>
        }

    }
}