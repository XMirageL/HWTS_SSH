<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2018/5/26
  Time: 19:37
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<% String url = request.getRequestURI(); %>
<div id="sidebar">
    <!-- Sidebar Brand -->
    <div id="sidebar-brand" class="themed-background">
        <a href="./" class="sidebar-title">
            <i class="fa fa-cloud"></i> <span class="sidebar-nav-mini-hide">任务分发系统 V1.0</span>
        </a>
    </div>
    <!-- END Sidebar Brand -->

    <!-- Wrapper for scrolling functionality -->
    <div class="slimScrollDiv" style="position: relative; overflow: hidden; width: auto; height: 516px;">
        <div id="sidebar-scroll" style="overflow: hidden; width: auto; height: 516px;">
            <!-- Sidebar Content -->
            <div class="sidebar-content">
                <!-- Sidebar Navigation -->
                <ul class="sidebar-nav">
                    <li>
                        <a id="user" href="/admin" <% if (url.equals("/WEB-INF/views/admin.jsp")){%>class="active" <%}%>><i
                                class="fa fa-child sidebar-nav-icon"></i><span
                                class="sidebar-nav-mini-hide">管理员中心</span></a>
                    </li>
                    <li>
                        <a id="adminissue" href="/adminissue" <% if (url.equals("/WEB-INF/views/adminissue.jsp")){%>class="active" <%}%>><i
                                class="fa fa-users sidebar-nav-icon"></i><span
                                class="sidebar-nav-mini-hide">发布任务</span></a>
                    </li>
                    <li>
                        <a id="taskkind" href="/taskkind" <% if (url.equals("/WEB-INF/views/taskkind.jsp")){%>class="active" <%}%>><i
                                class="fa fa-align-justify sidebar-nav-icon"></i><span
                                class="sidebar-nav-mini-hide">任务分类</span></a>
                    </li>
                    <li>
                        <a id="help" href="/adminquery" <% if (url.equals("/WEB-INF/views/adminquery.jsp")){%>class="active" <%}%>><i
                                class="fa fa-calendar-check-o sidebar-nav-icon"></i><span
                                class="sidebar-nav-mini-hide">信息查询</span></a>
                    </li>
                    <li>
                        <a id="import" href="/importInfo" <% if (url.equals("/WEB-INF/views/importInfo.jsp")){%>class="active" <%}%>><i
                                class="fa fa-sign-in sidebar-nav-icon"></i><span
                                class="sidebar-nav-mini-hide">批量注册</span></a>
                    </li>
                    <li>
                        <a id="index" href="/loginOut"><i class="fa fa-power-off sidebar-nav-icon"></i><span
                                class="sidebar-nav-mini-hide">注销登录</span></a>
                    </li>
                    <li>
                        <a href="javascript:void(0)" id="gongdan" class="sidebar-nav-menu"><i
                                class="fa fa-chevron-left sidebar-nav-indicator sidebar-nav-mini-hide"></i><i
                                class="fa fa-info sidebar-nav-icon"></i><span
                                class="sidebar-nav-mini-hide">关于我们</span></a>
                        <ul>
                            <li>
                                <a href="http://www.hunangy.com/">湖南工院</a>
                            </li>
                            <li>
                                <a href="./">软件协会</a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <!-- END Sidebar Navigation -->

            </div>
            <!-- END Sidebar Content -->
        </div>
    </div>
    <!-- END Wrapper for scrolling functionality -->

    <!-- Sidebar Extra Info -->
    <div id="sidebar-extra-info" class="sidebar-content sidebar-nav-mini-hide">
        <div class="text-center">
            <small><a target="_blank">任务分发系统 V1.0</a><br></small>
            <small><span>2018</span> &copy; <a href="./" target="_blank">RJXH</a></small>
        </div>
    </div>
    <!-- END Sidebar Extra Info -->
</div>