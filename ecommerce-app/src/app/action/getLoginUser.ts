export async function getLoginUser(request: Request) {
    const loginUser = request.headers.get('x-user-name')
    return loginUser
}