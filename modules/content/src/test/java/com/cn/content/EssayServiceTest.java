package com.cn.content;

import com.cn.dao.ClassifyRepository;
import com.cn.dao.CommentRepository;
import com.cn.dao.EssayRepository;
import com.cn.entity.Classify;
import com.cn.entity.Essay;
import com.cn.enums.EssayStatusEnum;
import com.cn.exception.GlobalException;
import com.cn.search.BookService;
import com.cn.util.MailUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.amqp.rabbit.core.RabbitTemplate;

import java.util.Optional;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class EssayServiceTest {
    private EssayRepository essayRepository;
    private ClassifyRepository classifyRepository;
    private EssayService essayService;

    @BeforeEach
    void setUp() {
        essayRepository = mock(EssayRepository.class);
        classifyRepository = mock(ClassifyRepository.class);
        essayService = new EssayService(
                essayRepository,
                classifyRepository,
                mock(CommentRepository.class),
                mock(BookService.class),
                mock(MailUtil.class),
                mock(RabbitTemplate.class));
    }

    @Test
    void publicDetailRejectsDraftsAndUnpublishedArticles() {
        when(essayRepository.findByIdAndStateIn(
                10L, Set.of(EssayStatusEnum.NORMAL, EssayStatusEnum.RECOMMEND)))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() -> essayService.getEssayDetail(10L))
                .isInstanceOf(GlobalException.class);
    }

    @Test
    void sanitizesRichTextBeforeSavingDraft() {
        Essay essay = new Essay();
        essay.setTitle("安全文章");
        essay.setSynopsis("<img src=x onerror=alert(1)>简介");
        essay.setContent("<p>正文</p><script>alert(1)</script><img src=x onerror=alert(2)>");
        when(classifyRepository.getReferenceById(1L)).thenReturn(new Classify());
        when(essayRepository.save(any(Essay.class))).thenAnswer(invocation -> {
            Essay saved = invocation.getArgument(0);
            saved.setId(20L);
            return saved;
        });

        essayService.createEssay(1L, essay);

        assertThat(essay.getSynopsis()).isEqualTo("简介");
        assertThat(essay.getContent())
                .contains("<p>正文</p>")
                .doesNotContain("script", "onerror", "alert");
    }
}
