package be.config.auth.filter;

import be.response.ErrorResponse;
import com.google.gson.Gson;
import io.jsonwebtoken.JwtException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtExceptionFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain) throws ServletException, IOException {
        try {
            chain.doFilter(req, res); // go to 'JwtAuthenticationFilter'
        } catch (JwtException ex) {
            setErrorResponse(HttpStatus.UNAUTHORIZED, res, ex);
        }
    }

    public void setErrorResponse(HttpStatus status, HttpServletResponse res, Throwable ex) throws IOException {
        Gson gson = new Gson();
        res.setStatus(status.value());
        res.setContentType("application/json; charset=UTF-8");

        ErrorResponse jwtExceptionResponse = ErrorResponse.of(HttpStatus.UNAUTHORIZED,ex.getMessage());
        res.getWriter().write(gson.toJson(jwtExceptionResponse, ErrorResponse.class));
    }

}