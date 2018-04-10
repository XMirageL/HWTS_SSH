package com.xl.interceptor;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/***
 * spring mvc 拦截器
 */
public class InterceptedRequestsNotLogin implements HandlerInterceptor
{
    /***
     * 第一个执行的方法，拦截请求
     * @param request 请求内容
     * @param response 响应内容
     * @param handler 被拦截请求的目标对象
     * @return false终止请求，true请求通过
     * @throws Exception
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        Object user = request.getSession().getAttribute("inputEmail");
        Object id = request.getSession().getAttribute("id");
        if (user == null || id == null) {
            System.out.println("尚未登录，调到登录页面");
            System.out.println("拦截的URL:"+request.getServletPath()+"\n--------------");
            response.sendRedirect("/notLogin?tzurl="+request.getServletPath());
            return false;
        }

        return true;
    }

    /***
     * 第二个执行的方法，拦截Controller返回的数据
      * @param httpServletRequest 请求内容
     * @param httpServletResponse 响应内容
     * @param o 被拦截请求的目标对象
     * @param modelAndView 可以修改显示的视图或修改里面的值
     * @throws Exception
     */
    @Override
    public void postHandle(javax.servlet.http.HttpServletRequest httpServletRequest, javax.servlet.http.HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception
    {

    }

    /***
     * 第三个执行的方法，主要用户销毁一些资源，很少用这个方法
     * @param httpServletRequest
     * @param httpServletResponse
     * @param o
     * @param e
     * @throws Exception
     */
    @Override
    public void afterCompletion(javax.servlet.http.HttpServletRequest httpServletRequest, javax.servlet.http.HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception
    {
    }
}
