FROM jekyll/jekyll:4.2.2

WORKDIR /srv/jekyll

ENV BUNDLE_FROZEN=true

# Copy the docs directory
COPY --chown=jekyll:jekyll docs/ ./

# Install dependencies
RUN bundle install

EXPOSE 4000

CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--port", "4000"]
