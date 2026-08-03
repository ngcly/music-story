import com.cn.exception.GlobalException;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class GlobalExceptionTest {

    @Test
    void supportsLegacyThreeDigitBusinessStatusCodes() {
        GlobalException exception = new GlobalException(333, "业务校验失败");

        assertThat(exception.getCode()).isEqualTo(333);
        assertThat(exception.getStatus().value()).isEqualTo(400);
        assertThat(exception).hasMessage("业务校验失败");
    }
}
